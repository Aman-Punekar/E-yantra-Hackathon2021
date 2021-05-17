// routes require only express and Router
const app = express();
const router = express.Router();

const {addDonorInfo} = require('../controllers/donorInfo');



router.post('/post', addDonorInfo);

module.exports = router;