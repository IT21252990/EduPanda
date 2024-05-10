import Swal from "sweetalert2";

export default async function RejectSwal(courseId){
    const { value: reason } = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33", 
        cancelButtonColor: "#3085d6", 
        background: "#1F2937",
        color: "#E5E7EB",
        confirmButtonText: "Yes, reject it!",
        iconColor: "#d33",
        input: 'textarea',
        inputLabel: 'Reason for rejection',
        inputPlaceholder: 'Enter your reason here...',
        inputAttributes: {
          'rows': 4
        }
      });
    
      if (reason) {
        try {
          const response = await fetch(`http://localhost:5001/api/courses/reject/${courseId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reason })
          });
    
          if (!response.ok) {
            throw new Error("Failed to reject the course");
          }
    
          const data = await response.json();
    
          Swal.fire({
            title: "Rejected!",
            text: `Course Rejected Reason: ${reason}`,
            icon: "success",
            confirmButtonColor: "#3085d6",
            iconColor: "#d33", 
            background: "#1F2937",
            color: "#E5E7EB"
          });
    
          // Here you can update the UI as needed, e.g., remove the rejected course from the list
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "Failed to reject the course",
            icon: "error",
            confirmButtonColor: "#3085d6", 
            background: "#1F2937",
            color: "#E5E7EB"
          });
        }
      }
}