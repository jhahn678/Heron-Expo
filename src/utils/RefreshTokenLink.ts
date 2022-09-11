import { 
    ApolloLink,
    FetchResult, 
    NextLink, 
    Observable, 
    Observer, 
    Operation
} from "@apollo/client"


interface QueuedOperation {
    operation: Operation,
    forward: NextLink
    observer: Observer<FetchResult>
}

interface Args {
    getAccessToken: () => Promise<string | null>
    validateAccessToken: (token: string | null) => boolean
    getRefreshToken: () => Promise<string | null>
    validateRefreshToken: (token: string | null) => boolean
    fetchNewAccessToken: (refreshToken: string) => Promise<string | null>
}

export class RefreshTokenLink extends ApolloLink {
    private getAccessToken: () => Promise<string | null>
    private getRefreshToken: () => Promise<string | null>
    private validateAccessToken: (token: string | null) => boolean
    private validateRefreshToken: (token: string | null) => boolean
    private fetchNewAccessToken: (refreshToken: string) => Promise<string | null>
    private isFetching: boolean = false;
    private operationQueue: QueuedOperation[] = [];
    private accessToken: string | null = null;

    constructor(args: Args){
        super()
        this.getAccessToken = args.getAccessToken;
        this.getRefreshToken = args.getRefreshToken;
        this.validateAccessToken = args.validateAccessToken;
        this.validateRefreshToken = args.validateRefreshToken;
        this.fetchNewAccessToken = args.fetchNewAccessToken;
    }

    private enqueue(operation: QueuedOperation){
        this.operationQueue.push(operation)
    }

    private cancelOperation(entry: QueuedOperation){
        this.operationQueue = this.operationQueue.filter(op => op !== entry)
    }

    private setAuthorization(operation: Operation, token: string | null): void{
        const authorization = typeof token === 'string' ? `Bearer ${token}` : undefined
        operation.setContext(({ headers={}, ...context }) => ({
            ...context,
            headers: {
                ...headers,
                authorization
            }
        }))
    }

    private executeQueue(token: string | null){
        this.isFetching = false;
        this.operationQueue.forEach(({ operation, forward, observer }) => {
            this.setAuthorization(operation, token)
            forward(operation).subscribe(observer)
            // console.log('AUTH LINK: EXECUTING QUEUE ITEM')
        })
    }

    public request(
        operation: Operation, 
        forward: NextLink
    ): Observable<FetchResult> | null{
        if(this.isFetching){
            return new Observable<FetchResult>((observer: Observer<FetchResult>) => {
                const entry = { operation, forward, observer }
                this.enqueue(entry)
                // console.log(`entry queued, length ${this.operationQueue.length}`)
                return () => this.cancelOperation(entry)
            })
        }else{
            if(this.accessToken){
                const isValid = this.validateAccessToken(this.accessToken);
                if(isValid) {
                    console.log('stored access token is valid')
                    this.setAuthorization(operation, this.accessToken)
                    return forward(operation)
                }
                // console.log('stored access token is invalid')
                this.accessToken = null
            }
            this.isFetching = true;
            return new Observable<FetchResult>((observer: Observer<FetchResult>) => {
                this.getAccessToken()
                    .then(token => {
                        const valid = this.validateAccessToken(token)
                        if(valid) throw token;
                        // console.log('getting refresh token')
                    })
                    .then(() => this.getRefreshToken())
                    .then(token => {
                        const valid = this.validateRefreshToken(token)
                        //typeof satisfies ts -- should be checked in function
                        if(!valid || typeof token !== 'string') throw new Error;
                        return this.fetchNewAccessToken(token)
                    })
                    .then(res => { throw res })
                    .catch(caught => {
                        if(typeof caught === 'string') this.accessToken = caught;
                        this.setAuthorization(operation, caught)
                        forward(operation).subscribe(observer)
                        this.executeQueue(caught)
                    })
            })
        }
        
    }   
}




