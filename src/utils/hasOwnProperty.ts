export const hasOwnProperty = <
    Obj extends {}, 
    Prop extends PropertyKey
>(obj: Obj, prop: Prop): obj is Obj & Record<Prop, unknown> => {
    return obj.hasOwnProperty(prop)
}