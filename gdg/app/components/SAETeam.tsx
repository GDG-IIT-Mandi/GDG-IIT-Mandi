"use client"
import React, { useEffect, useState } from "react";
import { auth, db, storage } from "./firebase";
import { collection, getDocs, updateDoc, doc, addDoc, deleteDoc } from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"; 
import { onAuthStateChanged } from "firebase/auth";
import { signInWithGoogle, logout } from "./authservice";
import styles from "./SAETeam.module.css";
import ProfileCard from "./ProfileCard";

interface Member {
  id: string;
  Name: string;
  Image: string;
  Linkedin: string;
  Instagram: string;
}

const SAETeam: React.FC = () => {
  const [items, setItems] = useState<Member[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImageURL, setEditImageURL] = useState<string>(""); 
  const [editLinkedin, setEditLinkedin] = useState<string>("");
  const [editInstagram, setEditInstagram] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [newImage, setNewImage] = useState<File | null>(null); 
  const [newLinkedin, setNewLinkedin] = useState<string>("");
  const [newInstagram, setNewInstagram] = useState<string>("");

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
        Image: imageUrl,
        Linkedin: newLinkedin,
        Instagram: newInstagram,
      });

      setItems((prevItems) => [
        ...prevItems,
        { id: docRef.id, Name: newName, Image: imageUrl, Linkedin: newLinkedin, Instagram: newInstagram },
      ]);

      setNewName("");
      setNewImage(null);
      setNewLinkedin("");
      setNewInstagram("");
    } catch (error: any) {
      console.error("Error adding item:", error);
    }
  };

  const handleEdit = (id: string, Name: string, Image: string, Linkedin: string, Instagram: string) => {
    setEditing(id);
    setEditName(Name);
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
        Image: imageUrl,
        Linkedin: editLinkedin,
        Instagram: editInstagram,
      });

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? { ...item, Name: editName, Image: imageUrl, Linkedin: editLinkedin, Instagram: editInstagram }
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

  return (
    <div>
      <h3 className={styles.sectionTitle}>Core Team</h3>
      <section className={styles.profile}>
        {items.map((member) => (
          <div key={member.id}>
            {editing === member.id ? (
              <div>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className={styles.input}
                />
                <input
                  type="file"
                  onChange={(e) => setEditImageFile(e.target.files ? e.target.files[0] : null)} // Update file state
                  className={styles.input}
                />
                <input
                  type="text"
                  value={editLinkedin}
                  onChange={(e) => setEditLinkedin(e.target.value)}
                  className={styles.input}
                />
                <input
                  type="text"
                  value={editInstagram}
                  onChange={(e) => setEditInstagram(e.target.value)}
                  className={styles.input}
                />
                <div className={styles.editingButtons}>
                  <button onClick={() => saveEdit(member.id)} className={styles.button}>
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className={`${styles.button} ${styles.cancelButton}`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <ProfileCard
                name={member.Name}
                imageSrc={member.Image}
                linkedinUrl={member.Linkedin}
                instagramUrl={member.Instagram}
              />
            )}
            {isAuthenticated && editing !== member.id && (
              <div>
                <button
                  onClick={() => handleEdit(member.id, member.Name, member.Image, member.Linkedin, member.Instagram)}
                  className={styles.button}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(member.id, member.Image)}
                  className={`${styles.button} ${styles.deleteButton}`}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </section>

      <div className={styles.container}>
        {isAuthenticated ? (
          <div className={styles.addItemForm}>
            <input
              type="text"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className={styles.input}
            />
            <input
              type="file"
              onChange={(e) => setNewImage(e.target.files ? e.target.files[0] : null)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Linkedin URL"
              value={newLinkedin}
              onChange={(e) => setNewLinkedin(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Instagram URL"
              value={newInstagram}
              onChange={(e) => setNewInstagram(e.target.value)}
              className={styles.input}
            />
            <div className={styles.editingButtons}>
              <button onClick={handleAddItem} className={`${styles.button} ${styles.signInOutButton}`}>
                Add Member
              </button>
              <button onClick={handleSignOut} className={`${styles.button} ${styles.signInOutButton}`}>
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <button onClick={handleSignIn} className={`${styles.button} ${styles.signInOutButton}`}>
            Sign In to Add Member
          </button>
        )}
      </div>
    </div>
  );
};

export default SAETeam;
