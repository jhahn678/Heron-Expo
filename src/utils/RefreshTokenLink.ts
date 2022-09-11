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
    getAndValidateAccessToken: () => Promise<string | null>
    getAndValidateRefreshToken: () => Promise<string | null>
    fetchNewAccessToken: (refreshToken: string) => Promise<string | null>
}

export class RefreshTokenLink extends ApolloLink {
    private getAndValidateAccessToken: () => Promise<string | null>
    private getAndValidateRefreshToken: () => Promise<string | null>
    private fetchNewAccessToken: (refreshToken: string) => Promise<string | null>
    private isFetching: boolean = false;
    private operationQueue: QueuedOperation[] = [];

    constructor(args: Args){
        super()
        this.getAndValidateAccessToken = args.getAndValidateAccessToken;
        this.getAndValidateRefreshToken = args.getAndValidateRefreshToken;
        this.fetchNewAccessToken = args.fetchNewAccessToken;
    }

    private enqueue(operation: QueuedOperation){
        this.operationQueue.push(operation)
    }

    private cancelOperation(entry: QueuedOperation){
        this.operationQueue = this.operationQueue.filter(op => op !== entry)
    }

    private executeQueue(authorization: string | null){
        this.isFetching = false;
        this.operationQueue.forEach(({ operation, forward, observer }) => {
            operation.setContext(({ headers={}, ...context }) => ({
                ...context,
                headers: {
                    ...headers,
                    authorization
                }
            }))
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
            this.isFetching = true;
            return new Observable<FetchResult>((observer: Observer<FetchResult>) => {
                this.getAndValidateAccessToken()
                    .then(token => { 
                        if(token) throw token
                        // console.log('getting refresh token')
                        return null 
                    })
                    .then(() => this.getAndValidateRefreshToken())
                    .then(token =>  { 
                        if(!token) throw new Error
                        return this.fetchNewAccessToken(token)
                    })
                    .then(res => { throw res })
                    .catch(caught => {
                        const authorization = typeof caught === 'string' ? `Bearer ${caught}` : null
                        operation.setContext(({ headers={}, ...context }) => ({
                            ...context,
                            headers: { ...headers, authorization }
                        }))
                        forward(operation).subscribe(observer)
                        this.executeQueue(authorization)
                    })
            })
        }
        
    }   
}




