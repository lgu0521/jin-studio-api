import type { NextApiRequest, NextApiResponse } from "next";
import { getFirestore, collection, getDocs, query, orderBy, } from "firebase/firestore";
import firebase from "../../../service/FirebaseConfig";
import { ProjectSimpleDTO } from "../../../dto/project.dto";
import Cors from "cors";
import RunMiddleware from "../../../service/RunMiddleware";
const cors = RunMiddleware(
    Cors({
        methods: ["GET", "POST", "OPTIONS"],
    })
);

const GetProjectThumnail = async (req: NextApiRequest, res: NextApiResponse) => {
    await cors(req, res);

    const firestore = getFirestore(firebase);
    let resJsonArray: ProjectSimpleDTO[] = [];

    try {
        const querySnapshotMenuCatagoryList = await getDocs(
            query(collection(firestore, "Project"), orderBy('datetime'))
        );

        querySnapshotMenuCatagoryList.forEach((c) =>
            resJsonArray.push({ ...c.data(), id: c.id } as ProjectSimpleDTO)
        );

        res.status(200).json(resJsonArray);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

export default GetProjectThumnail;
