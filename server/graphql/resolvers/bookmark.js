const BookmarkList = require('../../models/BookmarkList')
const Bookmark = require('../../models/Bookmark')

const resolvers = {
    Query: {
        async getBookmarkList(_, {objectID}) {
            try {
                const bookmark = await BookmarkList.find({objectID})
                
                if(bookmark){
                    return bookmark
                }
                else {
                    throw new Error('BookmarkList not found')
                }
                
            } catch(err) {
                throw new Error(err)
            }
        },
        async getBookmark(_, {objectID}) {
            try {
                const bookmark = await Bookmark.find({_id: objectID})
                
                if(bookmark){
                    return bookmark
                }
                else {
                    throw new Error('BookmarkList not found')
                }

            } catch (err) {
                throw new Error (err)
            }
        }
    }
}

module.exports = resolvers