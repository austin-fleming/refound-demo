import process from 'process'
import minimist from 'minimist'
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import {useState, useEffect} from 'react';
import { consoleLogger } from '@celo/base';
import fs from "fs/promises";
import { resolve } from 'path';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEZiMEVjRTFFMjBFMjgwZmFBNWUxMTQ5QTI0MDhkMjU0RjQ1MDVFQ2UiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjI4NjgxNDc4ODksIm5hbWUiOiJSZWZvdW5kV2ViM1N0b3JhZ2UifQ.CYS2krAPhgwEn5SP9lWh-kMtxiClr8Vdm6wu_eUaFr8"

export const CreatePage = () => {

	const storage = new Web3Storage({ token })
	const [alert, setAlert] = useState<string>();
	const [error, setError] = useState<string>();
	const [files, setFiles] = useState<any>();

	useEffect(() => {
		if(files){
			console.log(files)
		}
	}, [files])

	const fileToDataUri = (file:Blob) => new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (event) => {
		  resolve(event.target?.result)
		};
		reader.readAsDataURL(file);
		});

	const submitContent = async (event:any) => {
		event.preventDefault();
		  
		const cid = await storage.put( [new File([files as BlobPart], event.target.title.value + " Images", {type:"image"}), new File([event.target.postContent.value as BlobPart], event.target.title.value + " Text", {type:"text"})]);
		console.log(cid);
		if(cid){
			setAlert('Content Succesfully Uploaded.');
			console.log(cid);
		}else{
			setError("Error uploading to IPFS.");
		}

		//todo: call smart contract - create nft
	  };

	  const saveFiles = (e:any) => {
		e.preventDefault();
		var DataArray:any = [];
		const files = e.target.files;
		for(var x=0; x< files.length; x++){
			console.log(files[x]);
		  
			fileToDataUri(files[x])
			.then(async dataUri => {
				DataArray.push(dataUri);
			})

		}
		setFiles(DataArray);
	}

	return (
		<>
		<div style={{
			width:"65%",
			margin:"0 auto",
			backgroundColor:"lightgreen",
			borderRadius:"5px",
			textAlign:"center"
		}}>
			{alert}
		</div>
		<div style={{
			width:"65%",
			margin:"0 auto",
			backgroundColor:"lightred",
			borderRadius:"5px",
			textAlign:"center"
		}}>
			{error}
		</div>
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
					<div>
						{ files &&
							files.map((file:string) => {
								return (<img src={file}></img>);
							})
						}
					</div>
					<input  
						className="mb-4 border-b-2"
						id="image1"
						name="image1" 
						type="file"
						multiple={true}
						required onChange={saveFiles}></input>	
					<button
						type="submit"
						className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
					>
						Submit
					</button>
				</form>
				
			</div>
		</div>
		
		</>
	);
};
