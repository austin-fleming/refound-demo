import { AlertBar } from "@components/alert-bar/alert-bar";
import { DismissIcon } from "@components/icons/menu-icons";
import { toast } from "@services/toast/toast";
import type { Result } from "@utils/monads";
import { result } from "@utils/monads";
import type { MouseEventHandler } from "react";
import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import { getImageDimensions } from "../form-inputs/get-image-dimensions";

function dataURLtoFile(dataurl: string, filename: string): Result<File> {
	try {
		const arr = dataurl.split(",");
		//@ts-expect-error: We can be fairly certain this'll pass
		const mime = arr[0].match(/:(.*?);/)[1];

		const bstr = atob(arr[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}

		const file = new File([u8arr], filename, { type: mime });

		console.log({ file });
		return result.ok(file);
	} catch (err) {
		return result.fail(err as Error);
	}
}

const videoConstraints = {
	width: 720,
	height: 720,
	facingMode: "environment",
};

export const CaptureModal = ({
	setIsOpen,
	onPhotoTaken,
}: {
	setIsOpen: (state: boolean) => void;
	onPhotoTaken: (imageFile: File, width: number, height: number) => void;
}) => {
	const webcamRef = useRef(null);

	const capture: MouseEventHandler = useCallback(
		(e) => {
			// @ts-expect-error: HACK
			const imageBase64 = webcamRef.current.getScreenshot();
			const fileResult = dataURLtoFile(
				imageBase64,
				`capture_${new Date().toISOString()}.jpeg`,
			);

			fileResult.match({
				ok: (file) => {
					getImageDimensions(file).then(({ width, height }) => {
						onPhotoTaken(file, width, height);
					});
				},
				fail: (err) => {
					console.error(err);
					toast.error("Was not able to convert photo into a file.");
				},
			});
			e.stopPropagation();
		},
		[webcamRef],
	);

	return (
		<div className="fixed top-0 bottom-0 left-0 w-screen h-screen z-[9100] overflow-x-hidden overflow-y-scroll p-contentPadding bg-slate-900/30 backdrop-blur-sm">
			<div className="relative flex flex-col w-full max-w-screen-md gap-4 p-4 mx-auto bg-white border-2 border-black border-solid">
				<div className="flex flex-row justify-between w-full">
					<h3 className="text-2xl font-bold">Take a picture</h3>
					<button
						type="button"
						className="absolute top-4 right-4"
						onClick={(e) => {
							e.preventDefault();
							setIsOpen(false);
						}}
					>
						<DismissIcon
							aria-label="close modal"
							className="w-10 h-10 transition-colors duration-150 hover:text-slate-400"
						/>
					</button>
				</div>
				<AlertBar kind="info">
					Be aware that image capture may not work if your browser doesn&apos;t have
					camera permissions on your device.
				</AlertBar>

				<div className="relative">
					<Webcam
						audio={false}
						height={720}
						ref={webcamRef}
						screenshotFormat="image/jpeg"
						width={720}
						videoConstraints={videoConstraints}
					/>

					<div className="absolute top-0 left-0 flex flex-col items-center justify-end w-full h-full">
						<button
							className="mb-6 bg-green-300 border-black rounded-full hover:text-white btn btn-lg btn-ghost hover:bg-green-900 hover:border-white"
							onClick={capture}
						>
							Capture Photo
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
