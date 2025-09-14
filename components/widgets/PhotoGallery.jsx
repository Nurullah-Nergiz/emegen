"use client";
import React from "react";

const PhotoGallery = ({ photos }) => {
   const photoList = photos;
   return (
      <>
         <section className="flex-1 flex flex-col gap-4 main">
            <header className="flex justify-between items-center">
               <h2 className="flex items-center gap-2 text-xl font-semibold">
                  <i className="bx bx-camera"></i>
                  Photo Gallery
               </h2>
               <div className="">buttons</div>
            </header>
            <main className="">
               {photoList && photoList.length > 0 ? (
                  <div className="w-full h-80 flex gap-4 overflow-x-scroll scrollbar-hide">
                     {photoList.map((photo, index) => (
                        <div
                           key={index}
                           className="max-w-80 max-h-80 flex-shrink-0 rounded overflow-hidden shadow-lg">
                           <img
                              src={photo}
                              alt={`Photo ${index + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                           />
                        </div>
                     ))}
                  </div>
               ) : (
                  <p>No photos available.</p>
               )}
            </main>
         </section>
      </>
   );
};

export default PhotoGallery;
