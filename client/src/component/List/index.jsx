import FadeDemo from "./FlickingList"
import ListForm from "./ListForm"

const PlaceList = ({children}) => {

    return (
        <>
        <div>
            <ListForm>
                {children}
            </ListForm>
            <FadeDemo/>
        </div>

        
        </>
    )
}

export default PlaceList