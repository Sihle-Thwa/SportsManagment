"use client";
import React, { useState } from "react";
import { User, Upload } from "lucide-react";
import "./fileuploadcard.css";

interface UploadAttachmentProps {
	title?: string;
	description?: string;
	acceptedFileTypes?: string;
	maxFileSize?: number;
	maxDimensions?: { width: number; height: number };
	onFileSelect?: (file: File) => void;
	onFileRemove?: () => void;
}

const UploadAttachment: React.FC<UploadAttachmentProps> = ({
	title = "Upload and attach files",
	description = "Upload and attach files to this project.",
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
				if (onFileSelect) onFileSelect(file);
			};

			img.onerror = () => {
				URL.revokeObjectURL(objectUrl);
				setError("Unable to read image file.");
			};

			img.src = objectUrl;
		} else {
			setSelectedFile(file);
			setPreview(null);
			if (onFileSelect) onFileSelect(file);
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

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	return (
		<div className="cardBase_fileUpload">
			<div className="cardHeader_fileUpload">
				<div className="cardHeader-content_fileUpload_Icon">
					<User size={64} strokeWidth={1.5} />
				</div>
			</div>

			<div className="cardBody_fileUpload">
				<div className="cardBodyTitle_fileUpload">{title}</div>
				<div className="cardBodyDescription_fileUpload">{description}</div>

				{!selectedFile ? (
					<>
						<div
							className="fileDropzone"
							onDrop={handleDrop}
							onDragOver={handleDragOver}
						>
							<input
								id="file-upload"
								type="file"
								accept={acceptedFileTypes}
								onChange={handleFileChange}
								style={{ display: "none" }}
							/>
							<label
								htmlFor="file-upload"
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									cursor: "pointer",
									width: "100%",
								}}
							>
								<Upload size={24} strokeWidth={2} color="#f59e0b" />
								<div style={{ textAlign: "center", marginTop: "12px" }}>
									<span style={{ color: "#f59e0b", fontWeight: 600 }}>
										Click to upload
									</span>
									<span style={{ color: "var(--text-secondary)" }}>
										{" "}
										or drag and drop
									</span>
								</div>
								<p className="acceptedFile-types" style={{ marginTop: "8px" }}>
									{acceptedFileTypes.replace(/\./g, "").toUpperCase()} (max.{" "}
									{maxDimensions.width}×{maxDimensions.height}px)
								</p>
							</label>
						</div>

						{error && (
							<div className="fileError" role="alert">
								{error}
							</div>
						)}

						<div className="footerActions_fileUpload">
							<button
								className="button-secondary buttonGhost_fileUpload"
								onClick={handleRemove}
							>
								Remove
							</button>
							<button
								className="button-primary buttonPrimary_fileUpload"
								onClick={() => document.getElementById("file-upload")?.click()}
							>
								Add Photo
							</button>
						</div>
					</>
				) : (
					<>
						{preview && (
							<div className="filePreview">
								<img src={preview} alt="Preview" />
							</div>
						)}

						<div className="fileMeta">
							<div>
								<div className="fileMeta-name">{selectedFile.name}</div>
								<div className="fileMeta-size">
									{(selectedFile.size / 1024).toFixed(2)} KB
								</div>
							</div>
						</div>

						{error && (
							<div className="fileError" role="alert">
								{error}
							</div>
						)}

						<div className="footerActions_fileUpload">
							<button className="buttonGhost_fileUpload" onClick={handleRemove}>
								Remove
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default UploadAttachment;
