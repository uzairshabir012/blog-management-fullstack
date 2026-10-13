const { ImageKit } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function uploadFile(file) {
    try {
        const result = await imagekit.files.upload({
            file,
            fileName: `coverImage_${Date.now()}`,
            folder: "blog-project/images"
        });

        return result;

    } catch (err) {
        console.error("Cover Image Upload Error:", err);
        throw err;
    }
}

module.exports = uploadFile;