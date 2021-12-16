import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import RunMiddleware from "../../../service/RunMiddleware";
import { ProjectDTO } from "../../../dto/project.dto";
import GetDateFormat from "../../../service/GetDateFormat";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import firebase from "../../../service/FirebaseConfig";

const cors = RunMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

const CreateProject = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  if (req.method === "POST") {
    try {
      const Date = GetDateFormat();
      const firestore = getFirestore(firebase);
      const reqBody: ProjectDTO = JSON.parse(req.body);
      const docRef = await addDoc(collection(firestore, "Project"), {
        ...reqBody,
        datetime: Date,
      });
      res.status(200).json({ docId: docRef.id });
    } catch (e) {
      console.log("실패: " + e);
    }
  } else {
    // Handle any other HTTP method
  }
};

export default CreateProject;
