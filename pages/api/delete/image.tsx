import type { NextApiRequest, NextApiResponse } from "next";
import { getStorage, deleteObject, ref } from "firebase/storage";
import firebase from "../../../service/FirebaseConfig";
import { ImageStoreageDTO } from "../../../dto/image-storage.dto";
import Cors from "cors";
import RunMiddleware from "../../../service/RunMiddleware";

const cors = RunMiddleware(
    Cors({
        methods: ["GET", "POST", "OPTIONS"],
    })
);

const DeleteImage = async (req: NextApiRequest, res: NextApiResponse) => {
    await cors(req, res);
    if (req.method === "POST") {
        const firestorage = getStorage(firebase, process.env.NEXT_PUBLIC_FIREBASE_DATA_BASEURL);
        const reqBody: ImageStoreageDTO = JSON.parse(req.body);
        const refStorage = ref(firestorage, reqBody.storageRef);
        try {
            await deleteObject(refStorage);
            res.status(200).json({ message: "success" });
        } catch (e) {
            res.status(200).json({ message: "success" });
        }
    } else {
        // Handle any other HTTP method
    }
};

export default DeleteImage;
