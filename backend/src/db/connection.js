import moogoose from "mongoose"

export const db=async()=>
{
    try {
        console.log(process.env.DB_URL);
        const connection=await moogoose.connect(`${process.env.DB_URL}/AeroMatch`)
       // console.log(connection);
    } catch (error) {
        console.log("error in db connection")
      console.log(error);
    }
}
