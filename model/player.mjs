class Player {
    _id;
    playerKey;
    createdAt;

    constructor(options) {
        if(!(options['playerKey'])) {
            console.error("Invalid player key");
            return;
        }
        if(!(options['createdAt'])) {
            this.createdAt = new Date();
        }

        this.playerKey = options['playerKey'];
        
        if(options['_id']) this._id = options['_id'];
    }
    
    toJson = () => {
        return JSON.stringify(this);
    }
}

export default Player;