"use client";
import React, { useState } from "react";
import { User } from "lucide-react";
import { cn } from "../../lib/utils";
import "./fileuploadcard.css";

export interface FileUploadCardProps {
	title?: string;
	description: string;
	acceptedFileTypes?: string;
	maxFileSize?: number;
	maxDimensions?: { width: number; height: number };
	onFileSelect: (file: File) => void;
	onFileRemove?: () => void;
}

export const FileUploadCard: React.FC<FileUploadCardProps> = ({
	title = "Upload and attach files",
	description = "Upload and attach files to this profile.",
	acceptedFileTypes = ".svg,.png,.jpg,.gif",
	maxFileSize = 5 * 1024 * 1024,
	maxDimensions = { width: 800, height: 400 },
	onFileSelect,
	onFileRemove,
}) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleFile = (file?: File) => {
		if (!file) return;
		setError(null);

		if (file.size > maxFileSize) {
			setError(`File size exceeds ${maxFileSize / (1024 * 1024)}MB`);
			return;
		}

		const fileExtension = file.name.split(".").pop()?.toLowerCase();
		const acceptedExtensions = acceptedFileTypes
			.split(",")
			.map((t) => t.trim().replace(".", "").toLowerCase());

		if (fileExtension && !acceptedExtensions.includes(fileExtension)) {
			setError(`File type not supported. Allowed: ${acceptedFileTypes}`);
			return;
		}

		if (file.type.startsWith("image/")) {
			const img = new Image();
			const objectUrl = URL.createObjectURL(file);

			img.onload = () => {
				URL.revokeObjectURL(objectUrl);

				if (
					img.width > maxDimensions.width ||
					img.height > maxDimensions.height
				) {
					setError(
						`Image dimensions must not exceed ${maxDimensions.width}×${maxDimensions.height}px`,
					);
					return;
				}

				setSelectedFile(file);
				setPreview(objectUrl);
				onFileSelect(file);
			};

			img.onerror = () => {
				URL.revokeObjectURL(objectUrl);
				setError("Unable to read image file.");
			};

			img.src = objectUrl;
		} else {
			setSelectedFile(file);
			setPreview(null);
			onFileSelect(file);
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		handleFile(file);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const file = e.dataTransfer.files?.[0];
		handleFile(file);
	};

	const handleRemove = () => {
		setSelectedFile(null);
		setPreview(null);
		setError(null);
		if (onFileRemove) onFileRemove();
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
		e.preventDefault();

	return (
		<div
			className="cardBase_fileUpload"
			role="region"
			aria-labelledby="upload-title"
		>
			<div className="cardHeader_fileUpload">
				<div className="cardHeader-content_fileUpload">
					<User />
				</div>
				<div id="upload-title" className="cardTitle_fileUpload">
					{title}
				</div>
				<div className="cardDescription_fileUpload">{description}</div>
			</div>

			<div className="cardBody_fileUpload">
				{selectedFile ? (
					<div>
						{preview && (
							<div className="filePreview" aria-hidden>
								<img src={preview} alt="Profile preview" />
							</div>
						)}

						<div className="fileMeta" aria-live="polite">
							<div>
								<div className="fileMeta-name">{selectedFile.name}</div>
								<div className="fileMeta-size">
									{(selectedFile.size / 1024).toFixed(2)} KB
								</div>
							</div>

							<div style={{ display: "flex", gap: 8 }}>
								<button
									className={cn("btnBase", "btnGhost")}
									onClick={handleRemove}
								>
									Remove
								</button>
							</div>
						</div>
					</div>
				) : (
					<div
						className="fileDropzone"
						role="button"
						tabIndex={0}
						onDrop={handleDrop}
						onDragOver={handleDragOver}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								document.getElementById("file-upload")?.click();
							}
						}}
					>
						<input
							id="file-upload"
							type="file"
							accept={acceptedFileTypes}
							className="sr-only"
							onChange={handleFileChange}
						/>
						<div style={{ textAlign: "center" }}>
							<div className="acceptedFile-info">
								Click to upload or drag and drop
							</div>
							<div className="acceptedFile-types">
								{acceptedFileTypes.replace(/\./g, "").toUpperCase()} • max{" "}
								{maxDimensions.width}×{maxDimensions.height}px
							</div>
						</div>
					</div>
				)}

				{error && (
					<div className="fileError" role="alert">
						{error}
					</div>
				)}

				<div
					style={{ marginTop: 12, display: "flex", justifyContent: "center" }}
				>
					{!selectedFile && (
						<button
							className="btnBase"
							onClick={() => document.getElementById("file-upload")?.click()}
						>
							Add Photo
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default FileUploadCard;
