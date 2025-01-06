import app from './app.js'
import logger from './utils/logger.js';

const PORT = process.env.PORT || 3000


app.listen(PORT, () => {

    logger.info(`Server is running at port ${PORT}`);

})