import process from 'process'
import minimist from 'minimist'
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import {useState} from 'react';
import { consoleLogger } from '@celo/base';
import fs from "fs/promises";
import { resolve } from 'path';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEZiMEVjRTFFMjBFMjgwZmFBNWUxMTQ5QTI0MDhkMjU0RjQ1MDVFQ2UiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjI4NjgxNDc4ODksIm5hbWUiOiJSZWZvdW5kV2ViM1N0b3JhZ2UifQ.CYS2krAPhgwEn5SP9lWh-kMtxiClr8Vdm6wu_eUaFr8"

export const CreatePage = () => {
	const [alert, setAlert] = useState<string>();


	const fileToDataUri = (file:Blob) => new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (event) => {
		  resolve(event.target?.result)
		};
		reader.readAsDataURL(file);
		});

	const submitContent = async (event:any) => {
		event.preventDefault();
	
		const storage = new Web3Storage({ token })
		const files = event.target.image1.value;
		console.log(files);
		console.log(event.target.postContent.value);
		  
		fileToDataUri(files)
		.then(async dataUri => {
			const cid = await storage.put( [new File([dataUri as BlobPart], event.target.title.value, {type:"image"})]);
			console.log(cid);
			if(cid){
				setAlert('Content added with CID:'+ cid);
				console.log(cid);
			}else{
				setAlert("Error uploading to IPFS.");
			}
		})

		
	  };

	return (
		<>
		<div className="max-w-xs my-2 overflow-hidden rounded shadow-lg" style={{margin:"0 auto"}}>
			<div className="px-6 py-4">
				<div className="mb-2 text-xl font-bold">Create</div>
				<form className="flex flex-col" onSubmit={submitContent}>
				<label htmlFor="title" className="mb-2 italic">Title</label>
				<input  
					className="mb-4 border-b-2"
					id="title"
					name="title" 
					type="text"
					required></input>
				<label htmlFor="postContent" className="mb-2 italic">Post Content</label>
				<textarea  
					className="mb-4 border-b-2"
					id="postContent"
					name="postContent" 
					cols={40} 
					rows={5} 
					required></textarea>

				<label htmlFor="image1" className="mb-2 italic">Images</label>
				<input  
					className="mb-4 border-b-2"
					id="image1"
					name="image1" 
					type="file"
					multiple={true}
					required></input>		

				<button
					type="submit"
					className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
				>
					Submit
				</button>
				</form>
			</div>
		</div>
		<div>
			{alert}
		</div>
		</>
	);
};
