import type { NextApiRequest, NextApiResponse } from "next";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import firebase from "../../../service/FirebaseConfig";
import Cors from "cors";
import RunMiddleware from "../../../service/RunMiddleware";

const cors = RunMiddleware(
    Cors({
        methods: ["GET", "POST", "OPTIONS"],
    })
);

const DeleteProject = async (req: NextApiRequest, res: NextApiResponse) => {
    await cors(req, res);
    const { query: { id }} = req;
    try {
        const firestore = getFirestore(firebase);
        const docDelete = await deleteDoc(doc(firestore, "Project", id as string));
        res.status(200).json({ message: "success" });

    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

export default DeleteProject;
