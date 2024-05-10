import Swal from "sweetalert2";

export default async function ApproveSwal(courseId){
    try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#057A55",
          cancelButtonColor: "#d33", 
          background: "#1F2937", 
          confirmButtonText: "Yes, accept it!",
          color: "#E5E7EB",
          iconColor: "#3F83F8"
        });
    
        if (result.isConfirmed) {
          const response = await fetch(`http://localhost:5001/api/courses/approve/${courseId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            // You can include a request body if needed
            // body: JSON.stringify({ courseId: courseId })
          });
    
          if (!response.ok) {
            throw new Error("Failed to approve the course");
          }
    
          await response.json(); // Assuming the server returns JSON
    
          Swal.fire({
            title: "Approved",
            text: `The course has been successfully approved`,
            icon: "success",
            confirmButtonColor: "#3085d6",
            iconColor: "#057A55", 
            background: "#1F2937",
            color: "#E5E7EB"
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to approve the course",
          icon: "error",
          confirmButtonColor: "#1A56DB",
          background: "#1F2937",
          color: "#E5E7EB"
        });
      }
}