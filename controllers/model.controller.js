import Model from '../models/model.model.js';
import { uploadToB2 } from '../services/storage.service.js';

// Get all models (admin only)
export const getModels = async (req, res, next) => {
    try {
        const models = await Model.find();

        res.status(200).json({
            success: true,
            data: models
        })
    } catch (error) {
        next(error);
    }
}

// Get a single model || by id 
export const getModel = async (req, res, next) => {
    try {
        const model = await Model.findById(req.params.id);

        if (!model) {
            const error = new Error('Model not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: model
        })
    } catch (error) {
        next(error);
    }
}


// delete model

export const deleteModel = async (req, res, next) => {
    try {
        const model = await Model.findByIdAndDelete(req.params.id);
        if (!model) {
            const error = new Error('Model not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(204).json({
            success: true,
            data: {}
        })
    } catch (error) {
        next(error);
    }
}


// Upload model
export const uploadModel = async (req, res, next) => {
    try {
        const file = req.file; // From multer middleware
        const fileName = `models/${req.user.id}/${Date.now()}-${file.originalname}`;

        // Upload to Backblaze B2
        const fileUrl = await uploadToB2(file.buffer, fileName);

        // Save to database
        const model = await Model.create({
            userId: req.user.id,
            fileUrl,
            name: file.originalname,
        });

        res.status(201).json({ 
            success: true, 
            data: model 
        });
    } catch (error) {
        next(error)
        // res.status(500).json({ success: false, error: error.message });
    }
};


export const getModelEmbedCode = async (req, res, next) => {
    try {
        const model = await Model.findById(req.params.id);
        if (!model) {
            const error = new Error('Model not found');
            error.statusCode = 404;
            throw error;
        }

        const embedCode = `
      <div id="three-viewer-container" style="width: 800px; height: 600px;"></div>
      <script src="/embed.js"></script>
      <script>
        new ThreeViewer("three-viewer-container", "${model.fileUrl}");
      </script>
    `;

        res.status(200).json({
            success: true,
            data: embedCode
        })
    } catch (error) {
        next(error)
    }
};

