import React, { useState, useEffect } from "react";
import NavBar from "../../components/instructor/NavBar";
import Footer from "../../components/instructor/Footer";
import { useNavigate, useParams } from "react-router-dom";
import bg from "../../assets/coursemanagementbg.jpg"

function UpdateCourse() {
  const { courseId } = useParams();
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (courseId) {
          const response = await fetch(
            `http://localhost:5000/api/courses/${courseId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch courses");
          }
          const data = await response.json();
          setCourse(data);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();

  }, [courseId]);

  const [ updatedtitle , setUpdatedTitle ] = useState("");
  const [ updatedDiscription , setUpdatedDiscription ] = useState("");
  const [ updatedPrice , setUpdatedPrice ] = useState("");
  const [ updatedLevel , setUpdatedLevel ] = useState("");
  const [ updatedCategory , setUpdatedCategory ] = useState("");
  const [ updatedDuration , setUpdatedDuration ] = useState("");
  const [ updatedTags , setUpdatedTags ] = useState([]);
  const [tagArray , setTagArray ] = useState([]);

  useEffect(() => {
    if(course){
        setUpdatedTitle(course.title);
        setUpdatedDiscription(course.description);
        setUpdatedPrice(course.price);
        setUpdatedLevel(course.level);
        setUpdatedCategory(course.category);
        setUpdatedDuration(course.duration);
        setUpdatedTags(course.tags);
    }
  },[course])

  const handleUpdate = async (e) => {
    e.preventDefault();

    const tagsArray = updatedTags.split(",").map((tag) => tag.trim());
    setTagArray(tagsArray);

    const updatedCourse = { 
        ...course , 
        title : updatedtitle, 
        description : updatedDiscription,
        price : updatedPrice,
        level : updatedLevel,
        category : updatedCategory,
        duration : updatedDuration,
        Updated: true,
        tags : tagArray
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/courses/${courseId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCourse),
        }
      );
      if(response.ok){
        navigate("/course_management")
        console.log("Course updated successfully");
       
      }else if (!response.ok) {
        throw new Error("Failed to update course");
      }
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Course updated successfully",
        showConfirmButton: false,
        timer: 2000
      });
      
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="top-0 flex flex-col w-screen h-full bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
      <div className="flex flex-col grow-0">
        <NavBar />
      </div>
      <div className="flex flex-col items-center justify-center w-screen h-full grow">
        <section className="w-full px-5 mt-5 bg-white lg:w-2/3 dark:bg-gray-900 rounded-3xl">
          <div className="px-4 py-8 mx-auto lg:py-16">
            <div className="flex flex-row">
              <h1 className="items-center justify-center mx-auto mb-10 text-lg font-bold uppercase">
                {" "}
                Update course{" "}
              </h1>
            </div>

            <div className="flex flex-row justify-between">
              <h2 className="mb-4 text-xl font-bold text-gray-900 uppercase dark:text-white">
                {course.title}
              </h2>
              <h3>
                Date Created :{" "}
                {new Date(course.created_at).toLocaleDateString()}
              </h3>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={updatedtitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Title"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={updatedDiscription}
                    onChange={(e) => setUpdatedDiscription(e.target.value)}
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Description"
                    required
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={updatedPrice}
                    onChange={(e) => setUpdatedPrice(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Price"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="level"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Level
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={updatedLevel}
                    onChange={(e) => setUpdatedLevel(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="All Levels">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={updatedCategory}
                    onChange={(e) => setUpdatedCategory(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Business">Business</option>
                    <option value="IT & Software">IT & Software</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Photography">Photography</option>
                    <option value="Music">Music</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="duration"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Duration (in Hours)
                  </label>
                  <input
                    type="text"
                    name="duration"
                    id="duration"
                    value={updatedDuration}
                    onChange={(e) => setUpdatedDuration(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Duration"
                    required
                  />
                </div>
              
              </div>
              <div className="mt-5">
                <label
                  htmlFor="tags"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tags (Separate by commas)
                </label>
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  value={updatedTags}
                  onChange={(e) => setUpdatedTags(e.target.value)}
                  className="bg-gray-50 border mt-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Tags"
                />
              </div>
            <div>
                {course.contents && course.contents.map((content, index) => (
                <div className="mt-10" key={index}>
                  <h1>Content {index + 1}</h1>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="initialContentTitle"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Content Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="initialContentTitle"
                      value={content.title}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Content Title"
                      required
                    />
                  </div>
                  <div>
                  <label
                    htmlFor="level"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Content Type
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={content.type}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  >
                    <option value="">Select Content Type</option>
                    <option value="Lecture">Lecture</option>
                    <option value="Video">Video</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Project">Project</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Content Notes
                  </label>
                  <textarea
                    name="lectureNotes"
                    value={content.lectureNotes}
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Content Notes"
                    required
                  ></textarea>
                </div>
                {content.quizQuestions && content.quizQuestions.map((question, qIndex) => (
                <div key={qIndex}>
                    <label
                    htmlFor="quize_Question"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Quize Question {qIndex +1}
                  </label>
                  <textarea
                    id="quize_Question"
                    name="quize_Question"
                    value={question}
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Description"
                    required
                  ></textarea>

                </div>))}
              </div>
              ))}
            </div>
              <div className="inline-flex items-end justify-end right-0 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 dark:font-bold rounded-lg focus:ring-4 focus:ring-primary-200  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                 <button type="submit">Update Course</button>
              </div>
           
            </form>
          </div>
        </section>
      </div>
      <div className="flex flex-col grow-0">
        <Footer />
      </div>
    </div>
  );
}

export default UpdateCourse;
