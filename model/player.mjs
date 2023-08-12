class Player {
    _id;
    playerKey;
    createdAt;

    constructor(options) {
        let {_id, playerKey, createdAt} = options;

        if(!playerKey) return;
        if(!createdAt) createdAt = new Date();

        this.createdAt = createdAt;
        this.playerKey = playerKey;
        this._id = _id;
    }
    
    toJson = () => {
        return JSON.stringify(this);
    }
}

export default Player;