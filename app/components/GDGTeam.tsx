"use client";
import React, { useEffect, useState,useRef } from "react";
import { auth, db, storage } from "./firebase";
import { collection, getDocs, updateDoc, doc, addDoc, deleteDoc } from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"; 
import { onAuthStateChanged } from "firebase/auth";
import { signInWithGoogle, logout } from "./authservice";
import ProfileCard from "./ProfileCard";

interface Member {
  id: string;
  Name: string;
  Designation: string;
  Image: string;
  Linkedin: string;
  Instagram: string;
}

const GDGTeam: React.FC = () => {
  const [items, setItems] = useState<Member[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editDesignation, setEditDesignation] = useState<string>("");
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImageURL, setEditImageURL] = useState<string>(""); 
  const [editLinkedin, setEditLinkedin] = useState<string>("");
  const [editInstagram, setEditInstagram] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [newDesignation, setNewDesignation] = useState<string>("");
  const [newImage, setNewImage] = useState<File | null>(null); 
  const [newLinkedin, setNewLinkedin] = useState<string>("");
  const [newInstagram, setNewInstagram] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "Members"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Member[];
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

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error("Error signing in:", error);
      alert("Sign-in failed: " + error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
    } catch (error: any) {
      console.error("Error signing out:", error);
    }
  };

  const handleAddItem = async () => {
    if (!newName || !newImage) return;

    try {
      const storageRef = ref(storage, `Members/${newImage.name}`);
      await uploadBytes(storageRef, newImage);
      const imageUrl = await getDownloadURL(storageRef);

      const docRef = await addDoc(collection(db, "Members"), {
        Name: newName,
        Designation: newDesignation,
        Image: imageUrl,
        Linkedin: newLinkedin,
        Instagram: newInstagram,
      });

      setItems((prevItems) => [
        ...prevItems,
        { id: docRef.id, Name: newName,Designation: newDesignation, Image: imageUrl, Linkedin: newLinkedin, Instagram: newInstagram },
      ]);

      setNewName("");
      setNewDesignation("");
      setNewImage(null);
      setNewLinkedin("");
      setNewInstagram("");
    } catch (error: any) {
      console.error("Error adding item:", error);
    }
  };

  const handleEdit = (id: string, Name: string,Designation: string, Image: string, Linkedin: string, Instagram: string) => {
    setEditing(id);
    setEditName(Name);
    setEditDesignation(Designation);
    setEditImageURL(Image); 
    setEditLinkedin(Linkedin);
    setEditInstagram(Instagram);
    setEditImageFile(null); 
  };

  const saveEdit = async (id: string) => {
    try {
      let imageUrl = editImageURL; 

      if (editImageFile) {
        const storageRef = ref(storage, `Members/${editImageFile.name}`);
        await uploadBytes(storageRef, editImageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const itemRef = doc(db, "Members", id);
      await updateDoc(itemRef, {
        Name: editName,
        Designation: editDesignation,
        Image: imageUrl,
        Linkedin: editLinkedin,
        Instagram: editInstagram,
      });

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? { ...item, Name: editName,Designation: editDesignation, Image: imageUrl, Linkedin: editLinkedin, Instagram: editInstagram }
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
      const imageRef = ref(storage, imageUrl);
      if(imageRef){
        await deleteObject(imageRef);
      }
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } 
    catch (error: any) {
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

    container.addEventListener('wheel', preventDefaultScroll, { passive: false });
    return () => {
      container.removeEventListener('wheel', preventDefaultScroll);
    };
  }, []);
  return (
    <div className="p-6">
      <h3 className="text-3xl font-bold text-center mb-8">
        <span style={{ color: '#DB4437' }}>Co</span>
        <span style={{ color: '#0F9D58' }}>re</span>
        <span style={{ color: '#4285F4' }}> Te</span>
        <span style={{ color: '#F4B400' }}>am</span>
      </h3>
      <section
        ref={containerRef}
        onWheel={handleScroll}
        className="relative overflow-x-auto overflow-y-hidden whitespace-nowrap py-4 max-w-full"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
    >

  <div className="flex gap-6 text-gray-950">
    {items.map((member) => (
      <div key={member.id} className="w-72 flex-shrink-0 mx-3">
        {editing === member.id ? (
          <div className="space-y-4">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={editDesignation}
              onChange={(e) => setEditDesignation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="file"
              onChange={(e) => setEditImageFile(e.target.files ? e.target.files[0] : null)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={editLinkedin}
              onChange={(e) => setEditLinkedin(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={editInstagram}
              onChange={(e) => setEditInstagram(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div className="flex gap-2">
              <button
                onClick={() => saveEdit(member.id)}
                className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <ProfileCard
            name={member.Name}
            designation={member.Designation}
            imageSrc={member.Image}
            linkedinUrl={member.Linkedin}
            instagramUrl={member.Instagram}
          />
        )}
        {isAuthenticated && editing !== member.id && (
          <div className="flex gap-2 mt-2 rounded-lg border border-gray-500 p-2 justify-center items-center">
            <button
              onClick={() => handleEdit(member.id, member.Name, member.Designation, member.Image, member.Linkedin, member.Instagram)}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(member.id, member.Image)}
              className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    ))}
  </div>
</section>


      <div className="mt-8 rounded-lg border border-gray-500 px-2 py-2 flex justify-center items-center text-gray-950">
        {isAuthenticated ? (
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
              type="file"
              onChange={(e) => setNewImage(e.target.files ? e.target.files[0] : null)}
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
                className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
              >
                Add Member
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Sign In to Add Member
          </button>
        )}
      </div>
    </div>
  );
};

export default GDGTeam;
