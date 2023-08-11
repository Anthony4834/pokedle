class Player {
    _id;
    playerKey;
    history;

    constructor(options) {
        if(!(options['playerKey'])) throw new Error('invalid playerKey');

        this.playerKey = options['playerKey'];
        
        if(options['_id']) this._id = options['_id'];
        this.history = options.history ?? [];
    }
    
    toJson = () => {
        return JSON.stringify(this);
    }
}

export default Player;