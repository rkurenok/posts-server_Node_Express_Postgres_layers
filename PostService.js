import db from './db.js';
import fileService from './fileService.js';

class PostService {
    async create(post, picture) {
        const fileName = fileService.saveFile(picture);
        const createdPost = await db.query('INSERT INTO "Post" (author, title, content, picture) values ($1, $2, $3, $4) RETURNING *', 
            [post.author, post.title, post.content, fileName]);
        return createdPost;
    }

    async getAll() {
        const posts = await db.query('SELECT * from "Post"');
        res.json(posts);
    }

    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID');
        }
        const post = await db.query('SELECT * from "Post" where id=$1', [id]);
        return post;
    }

    async update(post) {
        if (!post.id) {
            throw new Error('не указан ID');
        }

        const updatedPost = await db.query(`UPDATE "Post" set author = $1, title = $2, content = $3, picture = $4 where id = $5 RETURNING *`, 
        [post.author, post.title, post.content, post.picture, post.id]);
        return updatedPost;
    }

    async delete(id) {
        if (!id) {
            throw new Error('не указан ID');
        }
        const post = await db.query(`DELETE FROM "Post" where id = $1`, [id]);
        return post;
    }
}

export default new PostService();