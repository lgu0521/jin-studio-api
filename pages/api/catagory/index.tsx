import type { NextApiRequest, NextApiResponse } from "next";
import { getFirestore, collection, getDocs, query, orderBy, } from "firebase/firestore";
import firebase from "../../../service/FirebaseConfig";
import { ProjectCatagoryDTO } from "../../../dto/project-catagory.dto";
import Cors from "cors";
import RunMiddleware from "../../../service/RunMiddleware";
const cors = RunMiddleware(
    Cors({
        methods: ["GET", "POST", "OPTIONS"],
    })
);

const GetProjectCatagoryList = async (req: NextApiRequest, res: NextApiResponse) => {
    await cors(req, res);

    const firestore = getFirestore(firebase);
    let resJsonArray: ProjectCatagoryDTO[] = [];

    try {
        const querySnapshotMenuCatagoryList = await getDocs(
            query(collection(firestore, "Catagory"))
        );

        querySnapshotMenuCatagoryList.forEach((c) =>
            resJsonArray.push({ ...c.data(), id: c.id } as ProjectCatagoryDTO)
        );

        res.status(200).json(resJsonArray);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

export default GetProjectCatagoryList;
