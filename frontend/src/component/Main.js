import React, { useState } from 'react';
import Navbar from './Navbar';
import Imagesec from './Imagesec';
import axios from 'axios';

const Main = ({ setnavdis }) => {
  const [localImages, setLocalImages] = useState(null); 
  const [result, setResult] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [resultGenerated, setResultGenerated] = useState(false);

  const resetResults = () => {
    setLocalImages(null); 
    setResult(null); 
    setResultGenerated(false); 
  };

  const handleLocalImageUpload = (event) => {
    const file = event.target.files[0]; 
    if (file) {
     
      if (event.target.files.length > 1) {
        alert('Only one image is allowed');
      } else {
        const imageUrl = URL.createObjectURL(file); 
        setLocalImages(imageUrl); 
      }
    }
  };

  const handleremove = () => {
    setLocalImages(null); 
  };

  const generateresult = () => {
    if (!localImages) {
      alert('Kindly Add Image');
      return;
    }

    setLoading(true); 
    setError(null); 
    setResultGenerated(false); 

   
    const formData = new FormData();
    const fileInput = document.querySelector('#file-upload');
    formData.append('file', fileInput.files[0]); 

    
    axios
      .post('http://127.0.0.1:5000/predict', formData) 
      .then((response) => {
        console.log('Success:', response.data);
        setResult(response.data); 
        setResultGenerated(true); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to upload the image. Please try again.');
        setLoading(false); 
      });
  };

  return (
    <>
      <Navbar setnavdis={setnavdis} />
      <Imagesec />

      <div id="intro" className="mx-16 my-16 md:mx-28 scroll-mt-28 text-black">
        <h1 className="flex justify-center items-center text-4xl font-bold pb-8 pt-2">INTRODUCTION</h1>
        <p className="text-2xl text-center pt-2">
          Our platform is built on the innovative concept of "Satellite Imagery Based
          Building Survey Using Machine Learning". We leverage advanced machine learning techniques and
          algorithms to analyze satellite images and provide accurate counts of buildings in a specified area.
        </p>
        <p className="text-2xl text-center pt-8">
          This technology allows us to count the number of buildings in a specific region but also users can compare images of different times. By analyzing
          those images, user can generate detailed reports on the changes in the number of buildings over time, offering valuable insights into urban development and growth rates.
        </p>
        <p className="text-2xl text-center pt-8 pb-8">
          Our system is particularly useful for urban planners, government agencies, and researchers who need to monitor construction activities, urban sprawl, and infrastructural expansion.
          The data generated can be used to assess the impact of new policies, track the progress of infrastructure projects, and identify areas of rapid development or decline.
        </p>
      </div>
      <div className="mx-16 my-16 md:mx-28 scroll-mt-28 text-black">
        <h1 className="flex justify-center items-center text-4xl font-bold pb-8 pt-2">WHY IT IS NEEDED</h1>
        <p className="text-2xl text-center pt-2">
         The reason why this website is created is that counting building using human force is both costly and time taken but if 
         using website than it decreases both time and cost and we also know the accuracy.
        </p>
        <p className="text-2xl text-center pt-8">
        Secondly if a area is hit by flood or earthquake or any natural disaster than at that particular time counting buildings using humanforce is very difficult and more important
         if we want damages report so early. So using this will help the planners and rescue teams to make arrangment for the affectees.
        </p>
        <p className="text-2xl text-center pt-8 pb-8">
        For governments to plan some facilitation services for the peoples according to number of buildings in that area then it would definitely 
        works for them and if want to track progress in particular area than it is also useful.
        </p>
      </div>
      <div className="mx-16 my-16 md:mx-28 scroll-mt-28 text-black">
        <h1 className="flex justify-center items-center text-4xl font-bold pb-8 pt-2">HOW IT WORKS
        </h1>
        <p className="text-2xl text-center pt-2">
        The structure of this website is composed of frontend and backend. At backend trained Machine learning model is integrated to backend. Now when backend recieves picture from frontend. It pass the picture to model and after
         building counted by model. It send results to backend and then backend send to frontend and then the results displayed to user.
        </p>
        
      </div>
      <div className="mx-16 my-16 md:mx-28 scroll-mt-28 text-black">
        <h1 className="flex justify-center items-center text-4xl font-bold pb-8 pt-2">HOW TO USE
        </h1>
        <p className="text-2xl text-center pt-2">
        Go to the image upload section, there you see map by opening it you can find your desired area after that you take screenshot of area using your own tools and then there is 'Choose File' section and there you upload the image and then the result is displayed to your screen after clicking 
        'Generate Result' button. It is not necessary to use map every time if you had picture already then directly upload and check it.
        </p>
        
      </div>
      <div id="imageupload" className="flex justify-center items-center scroll-mt-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold pb-4">UPLOAD IMAGE</h1>
          <div>
            <h2 className="text-xl font-bold pb-4 pt-4">Upload Pictures from Your Computer</h2>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="file-upload" className="cursor-pointer">
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="border-2 border-gray-300 p-2 rounded-lg"
                  onChange={handleLocalImageUpload}
                />
              </label>
              <h1 className="text-red-500">**click on Picture if you want to remove it**</h1>
            </div>
            <div className="flex justify-center items-center gap-4 p-4 flex-wrap">
              
              { localImages && (
                <div className="relative">
                  <img
                    src={localImages}
                    alt="Uploaded"
                    className="w-60 h-80 object-cover rounded-md shadow-lg"
                    onClick={handleremove}
                  />
                  <button
                    onClick={handleremove}
                    className="absolute top-0 right-0 text-white bg-red-500 px-2 py-1 rounded-full hover:bg-red-600"
                  >
                    X
                  </button>
                </div>
              )}
            </div>
            <div>
<h2 className='pt-4'>View Google Map</h2>
<div>
  <iframe
    title="Google Map"
    src="https://www.google.com/maps?q=Abbottabad,+Pakistan&z=13&output=embed"
    allowFullScreen
    style={{ height: '40rem', width: "60rem" }} 
  >
  </iframe>
</div>
</div>
          </div>

          <div className="flex justify-center items-center mt-5">
            <button
              onClick={generateresult}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Generate Results'}
            </button>
          </div>

          {resultGenerated && result && (
  <div className="mt-5  flex justify-center items-center min-h-screen py-10 bg-gradient-to-r rounded-lg shadow-xl from-blue-500 to-indigo-600">
    <div className="result-section py-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-xl mx-20 my-6 max-w-4xl w-full">
      
      <h2 className="text-3xl font-bold text-center mb-6">Results</h2>

      <div className="uploaded-image-section text-center mb-6">
        <h3 className="text-xl font-semibold mb-4">Uploaded Image:</h3>
        <div className="relative inline-block">
          <img
            src={localImages}
            alt="Uploaded preview"
            className="w-72 h-96 object-cover rounded-lg shadow-lg transform transition-all hover:scale-105"
          />
          
        </div>
      </div>
      <div className="uploaded-image-section text-center mb-6">
        <h3 className="text-xl font-semibold mb-4">Masked Image:</h3>
        <div className="relative inline-block">
        {result?.mask_image && <img src={`data:image/png;base64,${result?.mask_image}`} alt="Predicted Mask"
            className="w-72 h-96 object-cover rounded-lg shadow-lg transform transition-all hover:scale-105"
          />}
        </div>
      </div>


     
      <div className="results-info space-y-4 text-center">
        {/* {result?.message !== 'This is not a satellite image, please provide a valid satellite image.' && <p className="text-lg font-medium">Model Accuracy: <span className="text-yellow-300">77.4%</span></p>} */}
        {result?.message !== 'This is not a satellite image, please provide a valid satellite image.' && <p className="text-lg font-medium">Building Count: <span className="text-yellow-300">{result.building_count}</span></p>}
        <p className="text-lg font-medium">Message: <span className="italic text-yellow-300">{result.message}</span></p>
      </div>

    
      <div className="mt-8 text-center">
        <button
          onClick={resetResults}  
          className="px-6 py-3 bg-gray-800 text-white font-bold text-lg rounded-lg hover:bg-gray-700 transition-colors duration-300"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
)}


          {/* Show error message if there's an error */}
          {error && <div className="text-center text-red-500">{error}</div>}
        </div>
      </div>

      <div id="about" className="mx-16 my-16 md:mx-28 scroll-mt-24">
        <h1 className="text-4xl font-bold pb-4 text-center">ABOUT</h1>
        <p className="text-2xl text-center pt-8">
        In Our Final Year Project, group of three students. There is frontend, backend, Machine Learning Model and Custom Dataset.
        </p>
        <p className="text-2xl text-center pt-8">
        The frontend of our website is built using React, a powerful JavaScript framework that allows for the creation of dynamic and interactive user interfaces. To enhance the visual appeal and responsiveness of our application, we are utilizing Tailwind CSS, CSS framework. This combination streamlines our development process but also enables us to create a modern design that enhances user experience. On the backend, we have choosen Django, Python framework known for its simplicity and efficiency in building secure and scalable web applications. Both React and Django are widely adopted by developers worldwide.
        </p>
        <p className="text-2xl text-center pt-8">
        Our Model is UNET and the model trained on custom Dataset of City Abbottabad. The images of Dataset is labelled using Anylabeling tool which is new labelling tool with the support of Artificial Intelligence which after labelling image give us json file which contains the coordinates of all the building in particular image which is later use to create masks of building like one building in one png file and then later it is for training the model. All the tools use in project are uptodate,well- known and big community of users.
        </p>
      </div>
    </>
  );
};

export default Main;
