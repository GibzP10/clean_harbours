
const getPickups = async (req, res) => {
    try {
        var pickups =  [
                {
                    type: 'organic',
                    vendor: 'ABC',
                    time: '1667302096',
                    address: '10, Avenue park, flying machine road, Mumbai - 400001'
                }
            ];
        
        console.log(pickups);
        res.status(200).json(pickups);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Some error occured, please try again" });
    }
};

module.exports = { getPickups };