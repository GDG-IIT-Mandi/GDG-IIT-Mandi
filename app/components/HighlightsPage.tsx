"use client";
import React, { useEffect, useState } from "react";
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
import { handleSignOut } from "./GDGTeam";
import { imageToBase64 } from "./encode";

interface NewsItem {
  id: string;
  Headline: string;
  Content: string;
  Image: string;
  News: boolean;
  Date: string;
}

const NewsAndEvents: React.FC = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [editHeadline, setEditHeadline] = useState<string>("");
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImageURL, setEditImageURL] = useState<string>("");
  const [newHeadline, setNewHeadline] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newNews, setNewNews] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "News"));
        const data = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            ...docData,
            Date: docData.Date?.toDate
              ? docData.Date.toDate()
              : new Date(docData.Date),
          };
        });

        // Sort by descending date
        data.sort((a, b) => b.Date.getTime() - a.Date.getTime());
        setItems(data as NewsItem[]);
      } catch (error) {
        console.error("Error fetching news items:", error);
      }
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
    if (!newHeadline || !newContent || !newImageFile) return;

    try {
      const imageUrl = await imageToBase64(newImageFile);

      const docRef = await addDoc(collection(db, "News"), {
        Headline: newHeadline,
        Content: newContent,
        Image: imageUrl,
        News: newNews,
        Date: new Date().toISOString(),
      });

      setItems((prevItems) => [
        {
          id: docRef.id,
          Headline: newHeadline,
          Content: newContent,
          Image: imageUrl,
          News: newNews,
          Date: new Date().toISOString(),
        },
        ...prevItems,
      ]);

      setNewHeadline("");
      setNewContent("");
      setNewImageFile(null);
      setNewNews(true);
    } catch (error: any) {
      console.error("Error adding item:", error);
    }
  };

  const handleEdit = (
    id: string,
    Content: string,
    Headline: string,
    Image: string
  ) => {
    setEditing(id);
    setEditHeadline(Headline);
    setEditContent(Content);
    setEditImageURL(Image);
    setEditImageFile(null);
  };

  const saveEdit = async (id: string) => {
    try {
      let imageUrl = editImageURL;

      if (editImageFile) {
        imageUrl = await imageToBase64(editImageFile);
      }

      const itemRef = doc(db, "News", id);
      await updateDoc(itemRef, {
        Headline: editHeadline,
        Content: editContent,
        Image: imageUrl,
      });

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? {
                ...item,
                Headline: editHeadline,
                Content: editContent,
                Image: imageUrl,
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
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error: any) {
      console.error("Error deleting document or image:", error);
    }
  };

  const newsItems = items.filter((item) => item.News);
  const eventItems = items.filter((item) => !item.News);

  return (
    <div>
      <section className="flex flex-col lg:flex-row gap-10 p-3 text-gray-900">
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-3xl mb-6 text-blue-600 text-center font-bold">
            <span className="text-red-600">E</span>
            <span className="text-green-600">v</span>
            <span className="text-green-600">e</span>
            <span className="text-blue-600">n</span>
            <span className="text-blue-600">t</span>
            <span className="text-yellow-600">s</span>
          </h3>
          <ul className="list-none p-0">
            {eventItems.map((event) => (
              <li
                key={event.id}
                className="mb-8 bg-gray-200 rounded-lg p-6 shadow-md text-gray-900">
                <div className="relative max-[620px]:flex flex-col justify-center items-center">
                  <img
                    src={event.Image}
                    alt="event image"
                    className="float-right ml-4 mb-4 w-48 h-48 object-fill rounded-lg min-w-[20px] min-h-[20px] "
                  />
                  <h3 className="mb-4 text-xl text-blue-600 font-bold">
                    {event.Headline}
                  </h3>
                  {editing === event.id ? (
                    <div>
                      <input
                        type="text"
                        value={editHeadline}
                        onChange={(e) => setEditHeadline(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full min-h-[100px] resize-y p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="file"
                        onChange={(e) =>
                          setEditImageFile(
                            e.target.files ? e.target.files[0] : null
                          )
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex gap-4 mt-4">
                        <button
                          onClick={() => saveEdit(event.id)}
                          className="bg-blue-600 text-white px-6 py-2 rounded-full transition duration-300 ease-in-out hover:bg-blue-700">
                          Save
                        </button>
                        <button
                          onClick={() => setEditing(null)}
                          className="bg-gray-300 text-gray-900 px-6 py-2 rounded-full transition duration-300 ease-in-out hover:bg-gray-400">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600">{event.Content}</p>
                  )}
                  {isAuthenticated && editing !== event.id && (
                    <>
                      <button
                        onClick={() =>
                          handleEdit(
                            event.id,
                            event.Content,
                            event.Headline,
                            event.Image
                          )
                        }
                        className="bg-blue-600 text-white px-6 py-2 rounded-full transition duration-300 ease-in-out hover:bg-blue-700">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event.id, event.Image)}
                        className="bg-red-600 text-white px-6 py-2 rounded-full transition duration-300 ease-in-out hover:bg-red-700">
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 min-w-[300px]">
          <h3 className="text-3xl mb-6 text-blue-600 text-center font-bold">
            <span className="text-red-600">N</span>
            <span className="text-green-600">e</span>
            <span className="text-green-600">w</span>
            <span className="text-blue-600">s</span>
          </h3>
          <ul className="list-none p-0">
            {newsItems.map((news) => (
              <li
                key={news.id}
                className="mb-8 bg-gray-200 rounded-lg p-6 shadow-md text-gray-900">
                <div className="relative max-[620px]:flex flex-col justify-center items-center">
                  <img
                    src={news.Image}
                    alt="news image"
                    className="float-right ml-4 mb-4 w-48 h-48 object-fill rounded-lg min-w-[20px] min-h-[20px]"
                  />
                  <h3 className="mb-4 text-xl text-blue-600 font-bold">
                    {news.Headline}
                  </h3>
                  {editing === news.id ? (
                    <div>
                      <input
                        type="text"
                        value={editHeadline}
                        onChange={(e) => setEditHeadline(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full min-h-[100px] resize-y p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="file"
                        onChange={(e) =>
                          setEditImageFile(
                            e.target.files ? e.target.files[0] : null
                          )
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex gap-4 mt-4">
                        <button
                          onClick={() => saveEdit(news.id)}
                          className="bg-blue-600 text-white px-6 py-2 rounded-full transition duration-300 ease-in-out hover:bg-blue-700">
                          Save
                        </button>
                        <button
                          onClick={() => setEditing(null)}
                          className="bg-gray-300 text-gray-900 px-6 py-2 rounded-full transition duration-300 ease-in-out hover:bg-gray-400">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600">{news.Content}</p>
                  )}
                  {isAuthenticated && editing !== news.id && (
                    <>
                      <button
                        onClick={() =>
                          handleEdit(
                            news.id,
                            news.Content,
                            news.Headline,
                            news.Image
                          )
                        }
                        className="bg-blue-600 text-white px-6 py-2 rounded-full transition duration-300 ease-in-out hover:bg-blue-700">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(news.id, news.Image)}
                        className="bg-red-600 text-white px-6 py-2 rounded-full transition duration-300 ease-in-out hover:bg-red-700">
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {isAuthenticated && (
        <div className="flex flex-col gap-10 p-15">
          <>
            <div className="flex flex-col gap-4 p-5 bg-gray-100 rounded-lg shadow-md text-gray-950">
              <input
                type="text"
                placeholder="Headline"
                value={newHeadline}
                onChange={(e) => setNewHeadline(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <textarea
                placeholder="Content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full min-h-[100px]"
              />
              <input
                type="file"
                onChange={(e) =>
                  setNewImageFile(e.target.files ? e.target.files[0] : null)
                }
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newNews}
                  onChange={(e) => setNewNews(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                Is this news?
              </label>
              <button
                onClick={handleAddItem}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Add News/Event
              </button>
            </div>
            <button
              onClick={() => handleSignOut(setIsAuthenticated)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition mt-4">
              Sign Out
            </button>
          </>
        </div>
      )}
    </div>
  );
};

export default NewsAndEvents;
