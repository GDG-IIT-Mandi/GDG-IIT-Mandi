"use client";
import React, { useEffect, useState, useRef } from "react";
import { auth, db } from "./firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithGoogle, logout } from "./authservice";
import ProfileCard from "./ProfileCard";
import { imageToBase64 } from "./encode";
interface Member {
  id: string;
  Name: string;
  Designation: string;
  SubTeam: string;
  Image: string;
  Linkedin: string;
  Instagram: string;
}

export const handleSignIn = async (
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    await signInWithGoogle();
    setIsAuthenticated(true);
  } catch (error: any) {
    console.error("Error signing in:", error);
    alert("Sign-in failed: " + error.message);
  }
};

export const handleSignOut = async (
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    await logout();
    setIsAuthenticated(false);
  } catch (error: any) {
    console.error("Error signing out:", error);
  }
};

const GDGTeam: React.FC = () => {
  const [items, setItems] = useState<Member[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editDesignation, setEditDesignation] = useState<string>("");
  const [editSubTeam, setEditSubTeam] = useState<string>("");
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImageURL, setEditImageURL] = useState<string>("");
  const [editLinkedin, setEditLinkedin] = useState<string>("");
  const [editInstagram, setEditInstagram] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [newDesignation, setNewDesignation] = useState<string>("");
  const [newSubTeam, setNewSubTeam] = useState<string>("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newLinkedin, setNewLinkedin] = useState<string>("");
  const [newInstagram, setNewInstagram] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "Members"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Member[];
      setItems(data);
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleAddItem = async () => {
    if (!newName || !newImage) return;

    try {
      const imageUrl = await imageToBase64(newImage);

      const docRef = await addDoc(collection(db, "Members"), {
        Name: newName,
        Designation: newDesignation,
        SubTeam: newSubTeam,
        Image: imageUrl,
        Linkedin: newLinkedin,
        Instagram: newInstagram,
      });

      setItems((prevItems) => [
        ...prevItems,
        {
          id: docRef.id,
          Name: newName,
          Designation: newDesignation,
          SubTeam: newSubTeam,
          Image: imageUrl,
          Linkedin: newLinkedin,
          Instagram: newInstagram,
        },
      ]);

      setNewName("");
      setNewDesignation("");
      setNewSubTeam("");
      setNewImage(null);
      setNewLinkedin("");
      setNewInstagram("");
    } catch (error: any) {
      console.error("Error adding item:", error);
    }
  };

  const handleEdit = (
    id: string,
    Name: string,
    Designation: string,
    SubTeam: string,
    Image: string,
    Linkedin: string,
    Instagram: string
  ) => {
    setEditing(id);
    setEditName(Name);
    setEditDesignation(Designation);
    setEditSubTeam(SubTeam);
    setEditImageURL(Image);
    setEditLinkedin(Linkedin);
    setEditInstagram(Instagram);
    setEditImageFile(null);
  };

  const saveEdit = async (id: string) => {
    try {
      let imageUrl = editImageURL;

      if (editImageFile) {
        imageUrl = await imageToBase64(editImageFile);
      }

      const itemRef = doc(db, "Members", id);
      await updateDoc(itemRef, {
        Name: editName,
        Designation: editDesignation,
        SubTeam: editSubTeam,
        Image: imageUrl,
        Linkedin: editLinkedin,
        Instagram: editInstagram,
      });

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? {
                ...item,
                Name: editName,
                Designation: editDesignation,
                SubTeam: editSubTeam,
                Image: imageUrl,
                Linkedin: editLinkedin,
                Instagram: editInstagram,
              }
            : item
        )
      );
      setEditing(null);
    } catch (error: any) {
      console.error("Error updating document:", error);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      const itemRef = doc(db, "Members", id);
      await deleteDoc(itemRef);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error: any) {
      console.error("Error deleting member:", error);
    }
  };

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      event.preventDefault();
      event.stopPropagation();

      containerRef.current.scrollBy({
        left: event.deltaY,
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preventDefaultScroll = (e: WheelEvent) => {
      e.preventDefault();
      if (container) {
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener("wheel", preventDefaultScroll, {
      passive: false,
    });
    return () => {
      container.removeEventListener("wheel", preventDefaultScroll);
    };
  }, []);

  const groupedMembers = items.reduce(
    (acc: Record<string, Member[]>, member) => {
      const { SubTeam } = member;
      if (!acc[SubTeam]) {
        acc[SubTeam] = [];
      }
      acc[SubTeam].push(member);
      return acc;
    },
    {}
  );
  const getColoredSubTeamChars = (subTeam: string) => {
    const headColors = ["#DB4437", "#0F9D58", "#4285F4", "#F4B400"];
    const chars = subTeam.split("");
    const totalChars = chars.length;

    const charsPerSection = Math.ceil(totalChars / 4);

    return (
      <div className="flex justify-center gap-1">
        {chars.map((char, index) => {
          // Determine which color section this character belongs to
          const colorIndex = Math.floor(index / charsPerSection);
          // Use modulo to ensure we don't exceed our color array bounds
          const color = headColors[colorIndex % headColors.length];

          return (
            <h3
              key={index}
              className="text-3xl font-bold mb-8"
              style={{ color }}>
              {char}
            </h3>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-2">
      {Object.entries(groupedMembers).map(([subTeam, members]) => (
        <div key={subTeam} className="mb-12">
          {getColoredSubTeamChars(subTeam)}
          <div
            ref={containerRef}
            onWheel={handleScroll}
            className="relative overflow-x-auto overflow-y-hidden whitespace-nowrap py-4 max-w-full"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}>
            <div className="flex gap-6 text-gray-950">
              {members.map((member) => (
                <div key={member.id} className="w-72 flex-shrink-0 mx-3">
                  {editing === member.id ? (
                    <div className="space-y-4">
                      <div className="flex flex-col gap-4">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="Enter Name"
                        />
                        <input
                          type="text"
                          value={editDesignation}
                          onChange={(e) => setEditDesignation(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="Enter Designation"
                        />
                        <input
                          type="text"
                          value={editSubTeam}
                          onChange={(e) => setEditSubTeam(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="Enter Sub Team"
                        />
                        <input
                          type="file"
                          onChange={(e) =>
                            setEditImageFile(
                              e.target.files ? e.target.files[0] : null
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                          type="text"
                          value={editLinkedin}
                          onChange={(e) => setEditLinkedin(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="Enter LinkedIn URL"
                        />
                        <input
                          type="text"
                          value={editInstagram}
                          onChange={(e) => setEditInstagram(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="Enter Instagram URL"
                        />
                      </div>

                      <div className="flex gap-4 justify-end">
                        <button
                          onClick={() => saveEdit(member.id)}
                          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700">
                          Save
                        </button>
                        <button
                          onClick={() => setEditing(null)}
                          className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <ProfileCard
                      name={member.Name}
                      designation={member.Designation}
                      subTeam={member.SubTeam}
                      imageSrc={member.Image}
                      linkedinUrl={member.Linkedin}
                      instagramUrl={member.Instagram}
                    />
                  )}
                  {isAuthenticated && editing !== member.id && (
                    <div className="flex gap-2 mt-2 rounded-lg border border-gray-500 p-2 justify-center items-center">
                      <button
                        onClick={() =>
                          handleEdit(
                            member.id,
                            member.Name,
                            member.Designation,
                            member.SubTeam,
                            member.Image,
                            member.Linkedin,
                            member.Instagram
                          )
                        }
                        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member.id, member.Image)}
                        className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      {isAuthenticated && (
        <div className="mt-8 rounded-lg border border-gray-500 px-2 py-2 flex justify-center items-center text-gray-950">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Designation"
              value={newDesignation}
              onChange={(e) => setNewDesignation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Sub Team"
              value={newSubTeam}
              onChange={(e) => setNewSubTeam(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="file"
              onChange={(e) =>
                setNewImage(e.target.files ? e.target.files[0] : null)
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="LinkedIn URL"
              value={newLinkedin}
              onChange={(e) => setNewLinkedin(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Instagram URL"
              value={newInstagram}
              onChange={(e) => setNewInstagram(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddItem}
                className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700">
                Add Member
              </button>
              <button
                onClick={() => handleSignOut(setIsAuthenticated)}
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GDGTeam;
