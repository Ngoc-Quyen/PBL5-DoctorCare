import db from '../models';
import removeMd from 'remove-markdown';
import syncElastic from './syncsElaticService';
import helper from '../helper/client';

let getAllPosts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let posts = await db.Post.findAll({
                attributes: ['id', 'title', 'writerId', 'createdAt'],
            });
            await Promise.all(
                posts.map(async (post) => {
                    let user = await helper.getcustomerById(post.writerId);
                    let dateClient = helper.convertDateClient(post.createdAt);
                    post.setDataValue('writerName', user.name);
                    post.setDataValue('dateClient', dateClient);
                    return post;
                })
            );

            resolve(posts);
        } catch (e) {
            reject(e);
        }
    });
};

let postCreatePost = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            let post = await db.Post.create(item);

            // ko đồng bộ các bài đăng dành giới thiệu bác sĩ or chuyên khoa or phòng khám
            //syncs to elastic
            if (item.forDoctorId === '-1') {
                let plainText = removeMd(item.contentMarkdown);
                plainText.replace(/(?:\r\n|\r|\\n)/g, ' ');
                let data = {
                    postId: post.id,
                    writerId: post.writerId,
                    title: item.title,
                    content: plainText,
                };
                await syncElastic.createPost(data);
            }
            resolve(post);
        } catch (e) {
            reject(e);
        }
    });
};

let getDetailPostPage = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let post = await db.Post.findOne({
                where: { id: id },
                attributes: ['id', 'title', 'contentHTML', 'contentMarkdown', 'forDoctorId', 'forSpecializationId'],
            });
            if (!post) {
                reject(`Can't get post with id=${id}`);
            }
            resolve(post);
        } catch (e) {
            reject(e);
        }
    });
};

let getPostsPagination = (page, limit, role) => {
    return new Promise(async (resolve, reject) => {
        try {
            let posts = '';
            //only get bài đăng y khoa
            if (role === 'admin') {
                posts = await db.Post.findAndCountAll({
                    offset: (page - 1) * limit,
                    limit: limit,
                    attributes: ['id', 'title', 'contentMarkdown', 'contentHTML', 'createdAt', 'writerId', 'updatedAt'],
                    order: [['createdAt', 'DESC']],
                });
            } else {
                posts = await db.Post.findAndCountAll({
                    where: {
                        forDoctorId: -1,
                        forSpecializationId: -1,
                    },
                    offset: (page - 1) * limit,
                    limit: limit,
                    attributes: ['id', 'title', 'contentMarkdown', 'contentHTML', 'createdAt', 'writerId', 'updatedAt'],
                    order: [['createdAt', 'DESC']],
                });
            }

            let total = Math.ceil(posts.count / limit);

            await Promise.all(
                posts.rows.map(async (post) => {
                    let user = await helper.getcustomerById(post.writerId);
                    let dateClient = helper.convertDateClient(post.createdAt);
                    post.setDataValue('writerName', user.name);
                    post.setDataValue('dateClient', dateClient);
                    return post;
                })
            );
            // let users = await Promise.all(
            //     posts.rows.map(async (post) => {
            //         let user = await db.User.findOne({
            //             where: {
            //                 id: post.writerId,
            //             },
            //         });
            //         return user; // return the user object from the map function
            //     })
            // );
            // console.log('users from postService: ', users); // log the array of user objects
            resolve({
                posts: posts,
                total: total,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let deletePostById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let post = await db.Post.findOne({
                where: { id: id },
                attributes: ['id', 'forDoctorId', 'forSpecializationId'],
            });

            // chỉ delete bài đăng y khoa
            //sync to elasticsearch
            if (post.forDoctorId === -1) {
                await syncElastic.deletePost(post.id);
            }

            await post.destroy();
            resolve(true);
        } catch (e) {
            reject(e);
        }
    });
};

let putUpdatePost = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            let post = await db.Post.findOne({
                where: { id: item.id },
                attributes: ['id', 'forDoctorId', 'forSpecializationId'],
            });
            await post.update(item);

            //chỉ update bài đăng y khoa
            //sync to elasticsearch
            if (item.forDoctorId === '-1') {
                let plainText = removeMd(item.contentMarkdown);
                plainText.replace(/(?:\r\n|\r|\\n)/g, ' ');
                let data = {
                    postId: post.id,
                    writerId: post.writerId,
                    title: item.title,
                    content: plainText,
                };
                await syncElastic.updatePost(data);
            }

            resolve(true);
        } catch (e) {
            reject(e);
        }
    });
};

let doneComment = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let comment = await db.Comment.findOne({
                where: { id: id },
            });
            await comment.update({ status: true });
            resolve(comment);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    postCreatePost: postCreatePost,
    getAllPosts: getAllPosts,
    getDetailPostPage: getDetailPostPage,
    getPostsPagination: getPostsPagination,
    deletePostById: deletePostById,
    putUpdatePost: putUpdatePost,
    doneComment: doneComment,
};
