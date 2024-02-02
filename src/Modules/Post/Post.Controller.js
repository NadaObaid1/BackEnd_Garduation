import PostModel from "../../../DB/Model/Post.Model.js"
import SalonModel from "../../../DB/Model/Salon.Model.js";
import cloudinary from '../../Services/Cloudinary.js'





export const createPost = async (req, res) => { 
    try {
      const {secure_url, public_id} = await cloudinary.uploader.upload(req.file.path, {
          folder : `${process.env.APP_NAME}/posts`
      })
      
      const newPost = await PostModel.create({...req.body, image: {secure_url, public_id}})
      
      res.status(201).json(newPost); 
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ error});
     
  
    }
  };






export const getAllPosts = async (req, res) => { 
  const salonId = req.params.id;
    try {
      const salon = await SalonModel.findById(salonId);
        if (!salon) {
            return res.status(404).json({ message: "Salon not found" });
        }

      const posts = await PostModel.find({SalonId: salonId});
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    } 
  };

  export const getPostById = async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const updatePost = async (req, res) => {
    try {
      const updatedPost = await PostModel.findByIdAndUpdate(
        req.params.id, 
        {textPost: req.body.textPost},
        { new: true }
      );
      if (updatedPost) {
        res.status(200).json(updatedPost);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export const deletePost = async (req, res) => {
    try {
      const deletedPost = await PostModel.findByIdAndDelete(
        req.params.id
      );
      if (deletedPost) {
        res.status(200).json(deletedPost);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }; 


  

  const increaseLikes = async (postId, userId) => {
    try {
      const post1 = await PostModel.findById(postId)
      let post;
      if (post1.likes.includes(userId)){
         post = await PostModel.findOneAndUpdate({_id: postId}, 
          {$pull: {likes: userId}}, 
          {new: true});

      } else {
         post = await PostModel.findOneAndUpdate({_id: postId}, 
          {$addToSet: {likes: userId}}, 
          {new: true});

      }
        

        if (!post) {
            throw new Error('Post not found');
        }

        return post.likes;
    } catch (error) {
      console.log(error.message)
        throw new Error('Failed to increase likes');
    }
};

export { increaseLikes };


export const increaseLikesController = async (req, res) => {
  const postId = req.params.id; 
  const userId = req.params.Id;  
  try {
      const updatedLikes = await increaseLikes(postId, userId); 
      res.json({ likes: updatedLikes });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Failed to increase likes' });
  }
};





