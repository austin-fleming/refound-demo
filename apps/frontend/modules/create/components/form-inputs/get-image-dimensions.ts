export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> =>
	new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);

		const image = new Image();

		image.addEventListener("load", () => {
			resolve({ width: image.width, height: image.height });
		});

		image.addEventListener("error", (event) => {
			console.error(event.message);
			reject();
		});

		image.src = url;
	});
