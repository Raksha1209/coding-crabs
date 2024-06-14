
"use client"
import { useState } from 'react';
import { Countries } from '../../constents'
import { Institution } from '../../constents';
import { uploadProjects } from '@/api/apis';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress"



type PorjectDetails = {
    title: string;
    shortdiscription: string;
    category: string;
    theme: string;
    description: string;
    teckstack: string;
    projectlink: string;
    status: string;
    photo?: string;
    universityname: string;
    institutionname: string;
    qualification: string;
    collaborator?: string;
    userid: string;
    fullname: string;
    email: string;
    Institution: string;
    // emailToVerify: string
};

const initialProjectDetails: PorjectDetails = {
    title: "",
    shortdiscription: "",
    category: "Software",
    theme: "",
    description: "",
    teckstack: "",
    projectlink: "",
    status: "Completed",
    universityname: "",
    institutionname: "",
    qualification: "",
    userid: "",
    fullname: "",
    email: "",
    Institution: "",
    // emailToVerify: ""

};


const data = {
    title: '',
    shortdescription: '',
    description: ''
}


export default function UploadProject() {

    const [project, setProject] = useState(initialProjectDetails);
    const [projectId, setProjectId] = useState('');
    const [percentage, setPercentage] = useState();
    const router = useRouter();

    // For Form Validation_____________________________

    const [email, setEmail] = useState("");
    const [titleError, setTitleError] = useState('');
    const [shortDescriptionError, setShortDescriptionError] = useState('');
    const [themeError, setThemeError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [statusError, setStatusError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [projectLinkError, setProjectLinkError] = useState('');
    const [fullnameError, setFullnameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [universitynameError, setUniversityNameError] = useState("");
    const [institutionnameError, setInstitutionNameError] = useState('');
    const [qualificationError, setQualificationError] = useState("");

    const [agreeChecked, setAgreeChecked] = useState(false);
    const [agreeError, setAgreeError] = useState('');

    const [formValid, setFormValid] = useState(true);


    // ___________________________________________

    // Agreement checkbox
    const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgreeChecked(e.target.checked);
        setAgreeError('');
    };

    //   ______________________________________

    const InputfromText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProject({ ...project, [e.target.name]: e.target.value });
        console.log(project);
    }

    // const InputfromSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setProject({ ...project, [e.target.name]: e.target.value });
    //     console.log(project);
    // }
    const InputfromSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProject({ ...project, [name]: value });
        console.log(project);
    }

    function TextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setProject({ ...project, [e.target.name]: e.target.value });
        console.log(project);
    }

    const SendDetails = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        // Validate input fields _________________________
        let isValid = true;

        if (project.title.trim() === '') {
            setTitleError('Project/Research Name is required.');
            isValid = false;
        } else {
            setTitleError('');
        }

        if (project.shortdiscription.trim() === '') {
            setShortDescriptionError('Title is required.');
            isValid = false;
        } else {
            setShortDescriptionError('');
        }

        if (project.theme.trim() === '') {
            setThemeError('Theme is required.');
            isValid = false;
        } else {
            setThemeError('');
        }

        if (project.category.trim() === '--Select--') {
            setCategoryError('Category is required.');
            isValid = false;
        } else {
            setCategoryError('');
        }

        if (project.status.trim() === '--Select--') {
            setStatusError('Project Completion Status is required.');
            isValid = false;
        } else {
            setStatusError('');
        }

        if (project.description.trim() === '') {
            setDescriptionError('Detailed Description is required.');
            isValid = false;
        } else {
            setDescriptionError('');
        }

        if (project.projectlink.trim() === '') {
            setProjectLinkError('Project Link is required.');
            isValid = false;
        } else {
            setProjectLinkError('');
        }

        if (project.fullname.trim() === "") {
            setFullnameError("Full name is required.");
            isValid = false;
        } else {
            setFullnameError("");
        }

        // Validation for 'email' field
        if (project.email.trim() === "") {
            setEmailError("Email address is required.");
            isValid = false;
        } else if (!isValidEmail(project.email)) { // Use project.email here
            setEmailError("Invalid email address.");
            isValid = false;
        } else {
            setEmailError("");
        }

        // Institution Validation

        if (project.institutionname.trim() === "--Other--" && project.universityname.trim() === "") {
            setUniversityNameError("Institution name is required.");
            isValid = false;
        }
        else if (project.institutionname.trim() === "--Select--") {
            setInstitutionNameError("Institution name is required.");
            isValid = false;
        }
        else {
            setUniversityNameError("");
            setInstitutionNameError("");
        }

        // Validation for 'qualification' field
        if (project.qualification.trim() === "") {
            setQualificationError("Qualification is required.");
            isValid = false;
        } else {
            setQualificationError("");
        }

        // Funtion to Check the entered emil is valid or not________________________
        function isValidEmail(email: string) {
            // Regular expression for basic email validation
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

            // Test the email against the regex pattern
            return emailRegex.test(email);
        }

        // _____________________________Agreement checkbox

        if (!agreeChecked) {
            setAgreeError('You must have to agree to Publish');
            // You can also set 'isValid' to false here if needed.
            return; // Exit the function early if not checked.
        }

        // Check if any of the individual field validations failed
        if (!isValid) {
            setFormValid(false); // Set form validity to false
            return; // Exit early if any field is invalid
        }
        // ________________________________________________________________________


        // const inputString = JSON.stringify(project.teckstack);
        // console.log(inputString)
        // const array = inputString.split(',');
        // console.log(array)
        // array.map((item)=>
        //   project.teckstack.push(item)
        // );
        try {

            const userId = Cookies.get('userid');
            if (userId) {
                project.userid = userId
            }
            console.log(project)

            const res = await uploadProjects(project);
            console.log(res);
            if(res){
                toast.success('project uploaded Succesfully')
            }
           

        } catch (err: any) {
            console.log("Error in uploading Project")
        }

        // setProjectId(res?.data.message._id);
        // const inputArray = inputValue.split(',').map((item) => item.trim());
    }

    const sendForPlagarism = async() =>{
        try{
            console.log(project)
            data.title =project.title;
            data.shortdescription = project.shortdiscription;
            data.description = project.description
            console.log(data);
            const res = await axios.post('https://procollab-plagiarism.onrender.com/get',data);
             console.log(res);
            const firstObject = res.data[0];
            const per = firstObject.percentage;
            console.log(per)
            setPercentage(per);
            console.log(percentage)
        }catch(err:any){
            console.log('Error while checking for plagarism')
        }
    }

    return (
        <div className='flex bg-white justify-center'>


            <div className='border p-7 w-full md:w-3/5 shadow'>

                <div className="space-y-12 mt-20">
                    <div className="border-b-2 border-black pb-12">

                        <h2 className="pb-15 text-4xl font-semibold leading-9 text-center text-gray-900">Publish Your Project or Research</h2>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            {/* Project Name */}
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-black">
                                    Project/Research Name <span className='text-amber-500'>*</span>
                                </label>


                                <div className="mt-2">
                                    <div className="flex focus:outline-none focus:border-none rounded-md shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">Enter your Project Name</span> */}
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            autoComplete=""
                                            onChange={(e) => InputfromText(e)}
                                            // className="block flex-1 border-0 bg-transparent p-8 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            className='flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400  focus:ring-0 sm:text-sm sm:leading-6'
                                            placeholder="Your Project Name "
                                        />
                                    </div>
                                    <div className="text-red-500">
                                        {titleError && <p>{titleError}</p>}
                                    </div>
                                </div>
                            </div>
                            {/* ------------------------------------------------- */}

                            {/* Project Short Descriptiton */}

                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-black">
                                    Title <span className='text-amber-500'>*</span>
                                </label>


                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">Enter your Project Name</span> */}
                                        <input
                                            type="text"
                                            name="shortdiscription"
                                            id="shortdiscription"
                                            onChange={(e) => InputfromText(e)}
                                            autoComplete="shortdiscription"
                                            className='flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400  focus:ring-0 sm:text-sm sm:leading-6'
                                            placeholder="Short description(Must be in 1 line)"
                                        />
                                    </div>
                                    <div className="text-red-500">
                                        {shortDescriptionError && <p>{shortDescriptionError}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* teck stack  */}
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Technology Used
                                </label>
                                <div className="mt-2">
                                    <div className="flex focus:outline-none focus:border-none rounded-md shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">Enter your Project Name</span> */}
                                        <input
                                            type="text"
                                            name="teckstack"
                                            id="teckstack"
                                            onChange={(e) => InputfromText(e)}
                                            autoComplete="teckstack"
                                            className='flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400  focus:ring-0 sm:text-sm sm:leading-6'
                                            placeholder="e.g :- HTML, Node.js, LiDAR technology, Electron Microscope etc.."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Theme  */}

                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Theme <span className='text-amber-500'>*</span>
                                </label>
                                <div className="mt-2">
                                    <div className="flex focus:outline-none focus:border-none rounded-md shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">Enter your Project Name</span> */}
                                        <input
                                            type="text"
                                            name="theme"
                                            id="theme"
                                            onChange={(e) => InputfromText(e)}
                                            autoComplete="theme"
                                            className='flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400  focus:ring-0 sm:text-sm sm:leading-6'
                                            placeholder="e.g :- Web, Drone, Genetics, Blockchain, Rover etc.."
                                        />
                                    </div>
                                    <div className="text-red-500">
                                        {themeError && <p>{themeError}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* -------------------------------Category---------------------------------- */}
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-semibold leading-6 text-gray-900"
                                >
                                    Category <span className='text-amber-500'>*</span>
                                </label>
                                <div className="mt-2">
                                    <select
                                        onChange={(e) => InputfromSelect(e)}
                                        id="Category"
                                        name="category"
                                        autoComplete="category-name"
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option>--Select--</option>
                                        <option>All</option>
                                        <option>Software</option>
                                        <option>Hardware</option>
                                        <option>Hybrid(Software+Hardware)</option>
                                        <option>Others</option>
                                    </select>
                                    <div className="text-red-500">
                                        {categoryError && <p>{categoryError}</p>}
                                    </div>
                                </div>
                            </div>
                            {/* _________________Completion Status________________ */}

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="completion"
                                    className="block text-sm font-semibold leading-6 text-gray-900"
                                >
                                    Project Completion Status <span className='text-amber-500'>*</span>
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="status"
                                        name="status"
                                        onChange={(e) => InputfromSelect(e)}
                                        autoComplete="completion-name"
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option>--Select--</option>
                                        <option>Completed</option>
                                        <option>Under Development</option>
                                        <option>Proposed</option>
                                    </select>
                                </div>
                                <div className="text-red-500">
                                    {statusError && <p>{statusError}</p>}
                                </div>
                            </div>



                            {/* ------------------------Project brief Description------------------------------------- */}
                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Detailed Description <span className='text-amber-500'>*</span>
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        onChange={(e) => TextareaChange(e)}
                                        rows={3}
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                        placeholder=" Write Brief Description about your Project, Suggestion and Feedback for others "
                                    />
                                </div>
                                <div className="text-red-500">
                                    {descriptionError && <p>{descriptionError}</p>}
                                </div>
                                <div className='border-b-2 border-black pb-12' />
                            </div>
                            {/* ------------------------------------------------------------------ */}


                            {/* ---------------------Project Media------------------------ */}
                            <div className="col-span-full">
                                <h2 className="pb-6 text-3xl font-semibold leading-7 text-black">Media</h2>

                                {/* _______________________Project Link__________________________________ */}

                                <div className="sm:col-span-4 pb-8">
                                    <label htmlFor="username" className="block text-sm font-semibold leading-6 text-gray-900">
                                        Project Link <span className='text-amber-500'>*</span>
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="text"
                                                name="projectlink"
                                                id="projectlink"
                                                onChange={(e) => InputfromText(e)}
                                                autoComplete="link"
                                                className='flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400  focus:ring-0 sm:text-xs sm:leading-6'
                                                placeholder="Deployed Link/Source Link"
                                            />
                                        </div>
                                        <div className="text-red-500">
                                            {projectLinkError && <p>{projectLinkError}</p>}
                                        </div>
                                    </div>
                                </div>


                                {/* -----------Video Link-------------------------- */}

                                <div className="sm:col-span-4">
                                    <label htmlFor="username" className="block text-sm font-semibold leading-6 text-gray-900">
                                        Video Link
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="text"
                                                name="video"
                                                id="video"
                                                onChange={(e) => InputfromText(e)}
                                                autoComplete="video"
                                                className='flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400  focus:ring-0 sm:text-sm sm:leading-6'
                                                placeholder="Uploaded Video Link"
                                            />
                                        </div>
                                    </div>
                                </div>


                                {/* photo Link  */}
                                <div className="sm:col-span-4 mt-6">
                                    <label htmlFor="username" className="block text-sm font-semibold leading-6 text-gray-900">
                                        Project Photo Link
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="text"
                                                name="photo"
                                                id="photo"
                                                onChange={(e) => InputfromText(e)}
                                                autoComplete="photo"
                                                className='flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400  focus:ring-0 sm:text-sm sm:leading-6'
                                                placeholder="Uploaded photo Link"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* --------------Image upload------------------ */}

                                {/* <label htmlFor="cover-photo" className=" pt-12 block text-sm font-semibold leading-6 text-gray-900">
                                    Upload Photos of your Project
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-black px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    {/* ---------------------------------X--X---X-------------------------------------- */}

                    {/* ---------Personal Information------------------- */}
                    <div className="border-b-2 border-black pb-12">
                        <h2 className="text-3xl font-semibold leading-7 text-black">Personal Information</h2>
                        {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
                        {/* ------Name */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Full name <span className='text-amber-500'>*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="fullname"
                                        id="fullName"
                                        onChange={(e) => InputfromText(e)}
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder=" Enter your Name"

                                    />
                                </div>
                                <div className="text-red-500">
                                    {fullnameError && <p>{fullnameError}</p>}
                                </div>
                            </div>

                            {/* -----------Email-------------- */}
                            <div className="sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Email address <span className='text-amber-500'>*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={(e) => InputfromText(e)}
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder=" Enter valid Email Address"
                                    />
                                </div>
                                <div className="text-red-500">
                                    {emailError && <p>{emailError}</p>}
                                </div>
                            </div>

                            {/* ____________Country________________ */}
                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Country
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="country"
                                        name="country"
                                        onChange={(e) => InputfromSelect(e)}
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >

                                        {
                                            Countries.map((count: string, i: number) => (
                                                <option key={i}>{count}</option>
                                            ))
                                        }

                                    </select>
                                </div>
                            </div>

                            {/* ____________________ collaborators ___________________ */}
                            <div className="sm:col-span-4 mt-6">
                                <label htmlFor="username" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Collaborators
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="collaborator"
                                            id="collaborator"
                                            onChange={(e) => InputfromText(e)}
                                            autoComplete="collaborator"
                                            className='flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400  focus:ring-0 sm:text-sm sm:leading-6'
                                            placeholder="Who has helped or are the part of your Project / Research"
                                        />
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                    {/* ____________________________________Education Details _______________________ */}


                    <div className="col-span-full border-b-2 border-black pb-12">
                        <h2 className="pb-8 text-3xl font-semibold leading-7 text-gray-900">Education Details</h2>



                        <div className="sm:col-span-4 pb-8">
                            <label htmlFor="username" className="block text-base font-semibold leading-6 text-gray-900 pb-3">
                                Institute Name <span className='text-amber-500'>*</span>
                                <p className="text-xs text-gray-600" >Where You have worked on this Project</p>
                            </label>
                            {/* ----------------------Select Institution-------------------------------- */}
                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Select Institution
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="universityname"
                                        name="universityname"
                                        onChange={(e) => InputfromSelect(e)}
                                        autoComplete=" "
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >

                                        {
                                            Institution.map((count: string, i: number) => (
                                                <option key={i}>{count}</option>
                                            ))
                                        }

                                    </select>
                                </div>
                                <div className="text-red-500">
                                    {institutionnameError && <p>{institutionnameError}</p>}
                                </div>
                            </div>

                            {/* ---------------Others------------------------ */}
                            {/* <div className="mt-6 ">
                                <label htmlFor="Institution" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Other
                                    <p className="text-xs pb-4 text-gray-600" >Write Institution Name here if not Mention Above</p>

                                </label>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="universityname"
                                        onChange={(e) => InputfromText(e)}
                                        id="universityname"
                                        autoComplete="University name"
                                        className='flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400  focus:ring-0 sm:text-xs sm:leading-6'
                                        placeholder="University / College / School Name"
                                    />
                                </div>
                                <div className="text-red-500">
                                    {universitynameError && <p>{universitynameError}</p>}
                                </div>
                            </div> */}
                        </div>


                        {/* -----------qualification-------------------------- */}

                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-base font-semibold leading-6 text-gray-900 pb-3">
                                Qualification <span className='text-amber-500'>*</span>
                                <p className="text-xs text-gray-600" >When You have worked on this Project</p>
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="qualification"
                                        id="qualification"
                                        onChange={(e) => InputfromText(e)}
                                        autoComplete="qualification"
                                        className='flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400  focus:ring-0 sm:text-sm sm:leading-6'
                                        placeholder="What are you Studying at that time"
                                    />
                                </div>
                                <div className="text-red-500">
                                    {qualificationError && <p>{qualificationError}</p>}
                                </div>
                            </div>
                        </div>




                    </div>


                    {/* ----------Collaborator Notification---------------------------- */}



                    <div className=" pb-6">
                        <h2 className="text-lg font-semibold leading-7 text-black">Collaboration Notifications</h2>
                        <p className="mt-1 text-xs leading-6 text-gray-600">
                            We will Notify You when someone try to Collaborate with Your Project
                        </p>

                        <div className="mt-5 space-y-10">
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-black">By Email</legend>
                                <div className="mt-4 space-y-6">
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="yes"
                                                name="yes"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="Yes" className="font-medium text-black">
                                                Yes
                                            </label>
                                        </div>
                                    </div>

                                    <div className="pt-8 relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="Agree"
                                                name="Agree"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                checked={agreeChecked}
                                                onChange={(e) => handleAgreeChange(e)}

                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="Agree" className="font-medium text-black">
                                                Agree to Share your Project / Research as Open Source
                                            </label>
                                        </div>
                                        <div className="text-red-500">
                                            {agreeError && <p>{agreeError}</p>}
                                        </div>
                                    </div>
                                </div>


                            </fieldset>
                            {/* _________________________________Agreement_________________________________________________________ */}


                        </div>
                    </div>
                </div>

                <div className="mt-4  flex justify-center items-center  gap-x-6 mb-5">

                <Dialog.Root>


                    <Dialog.Trigger onClick={()=>sendForPlagarism()}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                       Public Project
                    </Dialog.Trigger> 
                   <Dialog.Portal>
                    <Dialog.Overlay className='fixed inset-0 bg-black/50'/>
                        <Dialog.Content className='fixed top-[30%] left-2 md:top-[30%] md:left-[40%] bg-white flex flex-col justify-between text-gray-900 shadow rounded-md p-8 w-[400px] h-[300px]'>
                             <div className='flex justify-between items-center gap-5'>
                                <h2 className='text-xl'>Upload Project</h2>
                                <Dialog.DialogClose>
                                    <button><X/></button>
                                </Dialog.DialogClose>
                             </div>
                            <div>
                                <Progress className='bg-black/50' value={percentage} /> 
                            </div>
                            <div className=' flex justify-center p-2'>
                            <p className='text-xl bg-green-500 rounded-full p-4'>{percentage}%</p>
                            </div>
                            <div>
                            {   
                                (percentage>60)?( 
                                <Button className='bg-green-500  hover:bg-green-600 p-4'>Send For Review</Button>  
                                ):<Button className='bg-green-500 p-4  hover:bg-green-600' onClick={(e)=>SendDetails(e)}>Upload</Button> 
                            }
                            </div>

                        </Dialog.Content>
                   </Dialog.Portal>
                </Dialog.Root>


                </div>
                <div className='pb-12 text-center'>
                    {!formValid && (
                        <div className="text-red-500">
                            Please fill in all required fields above.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// onClick={(e) => SendDetails(e)}