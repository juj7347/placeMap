import { useMutation } from "@apollo/client"
import { ASK_QUESTION } from "../GraphQL/graphql-types"

const QnA = ({placeID}) => {
    const [ askQuestion, {data,loading,error}] = useMutation(ASK_QUESTION)

    const onClick= e =>{
        try {
            askQuestion({variables: {placeQnAInput: {placeID: "1", authorID: "1", authorName: "1", body: "233"}}})
        } catch (err) {
            throw console.log(err)
        }
    }

    return (
        <div>
            <button onClick={onClick}>
                s
            </button>
        </div>
    )
}

export default QnA