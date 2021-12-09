import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import RunMiddleware from "../../../service/RunMiddleware";
import { AboutDTO } from "../../../dto/about.dto";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import firebase from "../../../service/FirebaseConfig";

const cors = RunMiddleware(
    Cors({
        methods: ["GET", "POST", "OPTIONS"],
    })
);

const CreateAbout = async (req: NextApiRequest, res: NextApiResponse) => {
    await cors(req, res);
    if (req.method === "POST") {
        try {
            const firestore = getFirestore(firebase);
            const reqBody: AboutDTO = JSON.parse(req.body);
            const docRef = await addDoc(collection(firestore, "About"), {
                ...reqBody
            });

            res.status(200).json({ message: docRef.id });
        } catch (e) {
            console.log("실패: " + e);
        }
    } else {
        // Handle any other HTTP method
    }
};

export default CreateAbout;
