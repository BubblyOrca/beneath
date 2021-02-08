from datetime import datetime

from config import reddit, SUBREDDIT, MAX_CHARACTERS


async def generate_comments(p):
    sub = await reddit.subreddit(SUBREDDIT)
    async for comment in sub.stream.comments():
        yield {
            "created_on": datetime.utcfromtimestamp(comment.created_utc),
            "id": comment.id,
            "author": comment.author.name,
            "subreddit": comment.subreddit.display_name,
            "post_id": comment.submission.id,
            "parent_id": comment.parent_id,
            "text": comment.body[:MAX_CHARACTERS] + " [CONTENT TRUNCATED]"
            if len(comment.body) > MAX_CHARACTERS
            else comment.body,
            "permalink": comment.permalink,
            "is_submitter": not not comment.is_submitter,
            "is_distinguished": not not comment.distinguished,
            "is_stickied": not not comment.stickied,
        }
