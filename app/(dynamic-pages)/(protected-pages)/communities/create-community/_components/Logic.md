1. Create a context enclosing the steps in the form

```tsx
    const [step1Response, ] = useState <Shape | undefined>(undefined)
    ...



```

2. On submit for the last step. Make an api call from within the context

```tsx

// in last step

const {onSubmit} = useContext(...)

<form onSubmit>

</form>

// in context
const {mutate}= useToastMutation(d)
function onSubmit(lastStepData){
    mutate({
        step1Response,
        step2Response,

        ....
        lastStepResponse
    })
}

```
