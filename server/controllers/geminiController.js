import FormData from 'form-data';

export const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ message: "Message is required" });
        }

        if (!process.env.GROQ_API_KEY) {
            return res.status(500).json({ message: "Groq API key is missing on the server" });
        }

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "llama-3.1-8b-instant", // Fast and capable Groq model
                "messages": [
                    {"role": "user", "content": message}
                ]
            })
        });

        const data = await response.json();
        console.log("Raw Groq response:", data);
        const text = data.choices?.[0]?.message?.content || "No response received";

        res.status(200).json({ message: text });
    } catch (error) {
        console.log("Error in chatWithAI controller: ", error.message);
        res.status(500).json({ message: "Internal server error connecting to AI" });
    }
};

export const transcribeAudio = async (req, res) => {
    try {
        if (!process.env.GROQ_API_KEY) {
            return res.status(500).json({ message: "Groq API key is missing on the server" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No audio file provided" });
        }

        const formData = new FormData();
        // Append the buffer directly as a file with a generic name
        formData.append("file", req.file.buffer, {
            filename: 'audio.weba',
            contentType: req.file.mimetype || 'audio/webm'
        });
        formData.append("model", "whisper-large-v3");

        const response = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                // FormData boundaries are automatically set using getHeaders()
                ...formData.getHeaders()
            },
            body: formData
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.error("Groq Whisper error:", data);
            throw new Error(data.error?.message || "Transcription failed");
        }

        res.status(200).json({ text: data.text });
    } catch (error) {
        console.error("Error in transcribeAudio controller: ", error.message);
        res.status(500).json({ message: "Failed to transcribe audio" });
    }
};
