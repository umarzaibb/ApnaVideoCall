export default function AsyncHandler(frc) {
    return (req,res,next)=>{
      frc(req,res,next).catch((err)=>{
          console.log(err.message);
      })
    }
}