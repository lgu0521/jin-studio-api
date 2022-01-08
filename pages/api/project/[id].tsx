import type { NextApiRequest, NextApiResponse } from "next";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebase from "../../../service/FirebaseConfig";
import { ProjectDTO } from "../../../dto/project.dto";
import Cors from "cors";
import RunMiddleware from "../../../service/RunMiddleware";

const cors = RunMiddleware(
    Cors({
        methods: ["GET", "POST", "OPTIONS"],
    })
);

const ProjectPage = async (req: NextApiRequest, res: NextApiResponse) => {
    await cors(req, res);
    const { query: { id }} = req;

    const firestore = getFirestore(firebase);
    var resJsonData = {} as ProjectDTO;

    try {
        const querySnapshot = await doc(firestore, "Project", id as string);
        const getDocQeury = await getDoc(querySnapshot);
        const projectData = getDocQeury.data();

        if (projectData) {
            resJsonData.id = id as string;
            resJsonData.title = projectData.title;
            resJsonData.catagory = projectData.catagory;
            resJsonData.thumbnail = projectData.thumbnail;
            resJsonData.content = projectData.content;
            resJsonData.datetime = projectData.datetime.toDate();
        }
        resJsonData.content.map((item, i) => {
            if (item.type == 'gallery' && Array.isArray(item.item)) {
                item.item.sort((a, b) => a.order - b.order);
            }
        })
        resJsonData.content.sort((a, b) => a.order - b.order);
        res.status(200).json(resJsonData);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

export default ProjectPage;
