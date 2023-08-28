import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

const NotePage = () => {

    const {id} = useParams();
    const [note, setNote] = useState(null);

    useEffect(() => {
        getNote();
    }, [id]);

    const getNote = async () => {
        const response = await fetch(`/api/notes/${id}/`)
        const data = await response.json();
        setNote(data);
    }

    return(
        <div>
            <h2>{note?.body}</h2>
        </div>
    )
}

export default NotePage;