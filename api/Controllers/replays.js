import db from "../db.js";
import fs from "fs";

const parseReplayFile = (filePath) => {
    try {
        const fileBuffer = fs.readFileSync(filePath);
        const headerContent = fileBuffer.toString('utf-8', 0, 1024);
        const mapRegex = /scenarios\\mp\\(.*?)\\/;
        const match = headerContent.match(mapRegex);

        if (match && match[1]) {
            const mapString = match[1];
            const modeMatch = mapString.match(/(\d+)p/);
            const playerCount = modeMatch ? parseInt(modeMatch[1]) : 2;

            const mapName = mapString
                .replace(/(\d+)p_/, '')
                .replace(/_/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());

            return {
                map_name: mapName,
                player_count: playerCount,
                game_version: "5.0.27.2025",
            };
        }
    } catch (error) {
        console.error("Error parsing replay file:", error);
    }

    return {
        map_name: "Unknown Map",
        player_count: 2,
        game_version: "Unknown",
    };
};

export const getReplays = (_, res) => {
    const q = "SELECT * FROM replays ORDER BY upload_timestamp DESC";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const addReplay = (req, res) => {
    if (!req.file) {
        return res.status(400).json("No file uploaded.");
    }

    const parsedData = parseReplayFile(req.file.path);

    const q =
        "INSERT INTO replays(`title`, `description`, `uploader_name`, `filename`, `file_path`, `map_name`, `player_count`, `game_version`) VALUES (?)";
    
    const values = [
        req.body.title,
        req.body.description,
        req.body.uploaderName,
        req.file.originalname,
        req.file.path,
        parsedData.map_name,
        parsedData.player_count,
        parsedData.game_version,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json("Replay has been created successfully.");
    });
};

export const updateReplay = (req, res) => {
    const q = "UPDATE replays SET `title` = ?, `description` = ?, `uploader_name` = ? WHERE `id` = ?";
    const values = [req.body.title, req.body.description, req.body.uploaderName];
    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Replay has been updated.");
    });
};

export const deleteReplay = (req, res) => {
    const q = "DELETE FROM replays WHERE `id` = ?";
    db.query(q, [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Replay has been deleted.");
    });
};
