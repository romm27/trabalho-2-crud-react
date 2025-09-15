import "./DataList.css";

const getBannerForReplay = (playerCount) => {
  if (playerCount <= 2) return "/assets/banner_1v1.jpg";
  if (playerCount <= 4) return "/assets/banner_2v2.jpg";
  if (playerCount <= 6) return "/assets/banner_3v3.jpg";
  return "/assets/banner_4v4.jpg";
};

function DataList({ replays, handleEdit, handleDelete }) {
  const API_URL = 'http://localhost:8800';

  return (
    <div className="replays-grid">
      {replays.map((replay) => (
        <div className="replay-card" key={replay.id}>
          <div
            className="card-banner"
            style={{ '--bg-image': `url(${getBannerForReplay(replay.player_count)})` }}
          ></div>
          
          <div className="card-content">
            <h3>{replay.title}</h3>
            <p className="metadata">
              <strong>Uploader:</strong> {replay.uploader_name}
            </p>
            <p className="metadata">
              <strong>Map:</strong> {replay.map_name}
            </p>
            <p className="metadata">
              <strong>Mode:</strong> {replay.player_count / 2}v{replay.player_count / 2}
            </p>
            
            <p className="description">{replay.description || 'No description available.'}</p>
          </div>

          <div className="card-actions">
            <a
              href={`${API_URL}/${replay.file_path}`}
              download
              className="btn btn-download"
            >
              Download Replay
            </a>
            <button onClick={() => handleEdit(replay)} className="btn btn-edit">Edit</button>
            <button onClick={() => handleDelete(replay.id)} className="btn btn-delete">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DataList;
