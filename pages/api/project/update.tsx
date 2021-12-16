import type { NextApiRequest, NextApiResponse } from "next";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import firebase from "../../../service/FirebaseConfig";
import { ProjectDTO } from "../../../dto/project.dto";
import Cors from "cors";
import RunMiddleware from "../../../service/RunMiddleware";

const cors = RunMiddleware(
    Cors({
        methods: ["GET", "POST", "OPTIONS"],
    })
);
const UpdateProject = async (req: NextApiRequest, res: NextApiResponse) => {
    await cors(req, res);
    if (req.method === "POST") {
        try {
            const firestore = getFirestore(firebase);
            const reqBody = JSON.parse(req.body);
            const newDocRef = doc(firestore, "Project", reqBody.id);
            const docUpdate = await updateDoc(newDocRef, reqBody);

            res.status(200).json({ docId: reqBody.id });
        } catch (e) {
            console.log("실패: " + e);
        }
    } else {
        // Handle any other HTTP method
    }
};

export default UpdateProject;
