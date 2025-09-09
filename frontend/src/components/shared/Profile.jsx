import { Award, BookText, Contact, Mail, Pen } from "lucide-react";
import React, { useState } from "react";
import AppliedJobs from "./AppliedJobs";
import UpdateProfileDialogue from "../User update/UpdateProfileDialogue";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";


const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="mx-5">
      <div className="flex flex-col bg-white border border-gray-300 rounded-2xl my-5 p-8 shadow-md">
        {/* Profile Info */}
        <div className="flex flex-col justify-center items-center">
          <img
            className="h-28 w-28 rounded-full border shadow-sm"
            src={
              user?.profile?.profilePhoto ||
              "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"
            }
            alt="profile"
          />
          <h1 className="font-bold mt-3 text-lg">
            {user?.fullname}
            <button
              onClick={() => setOpen(true)}
              className="ml-2 text-gray-500 hover:text-black cursor-pointer"
            >
              <Pen className="w-4 h-4" />
            </button>
          </h1>
        </div>

        <hr className="my-5" />

        {/* Contact Info */}
        <div className="space-y-4">
          <div>
            <div className="flex gap-3 items-center">
              <Mail />
              <span className="font-semibold">Email</span>
            </div>
            <h1 className="text-gray-700">{user?.email}</h1>
          </div>

          <div>
            <div className="flex gap-3 items-center">
              <Contact />
              <span className="font-semibold">Contact</span>
            </div>
            <h1 className="text-gray-700">+91 {user?.phoneNumber}</h1>
          </div>

          <div>
            <div className="flex gap-3 items-center">
              <Contact />
              <span className="font-semibold">Bio</span>
            </div>
            <h1 className="text-gray-700">{user?.profile?.bio || `Hello, I'm ${user?.fullname}`}</h1>
          </div>

          {/* Skills */}
          <div>
            <div className="flex gap-3 items-center">
              <Award />
              <span className="font-semibold">Skills</span>
            </div>
            {user?.profile?.skills?.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {user.profile.skills.map((item, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 px-3 py-1 rounded-2xl text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-gray-500">N/A</span>
            )}
          </div>

          {/* Resume */}
          <div>
            <div className="flex gap-3 items-center">
              <BookText />
              <span className="font-semibold">Resume</span>
            </div>
            <div className="mt-2">
              {user?.profile?.resume ? (
                <a
                  href={user?.profile?.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-red-500 cursor-pointer text-white px-4 py-1 rounded-md hover:bg-red-600 transition text-sm"
                >
                  View Resume
                </a>
              ) : (
                <span className="text-gray-500">N/A</span>
              )}
            </div>
          </div>
        </div>

        <hr className="my-5" />

        {/* Applied Jobs */}
        <AppliedJobs />
      </div>
      <UpdateProfileDialogue open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
