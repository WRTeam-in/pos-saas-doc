---
title: PHP ini settings
description: PHP settings that affect uploads, long installs and backups.
---

# PHP ini settings

The defaults of most hosts work. Adjust these only if you hit the problems described.

**Where to find it:** your host's PHP settings, or `php.ini`.

## Uploads

| Setting | Why it matters |
|---------|----------------|
| `upload_max_filesize` | The largest single file you can upload (product pictures, logos, expense receipts). |
| `post_max_size` | The largest total request. Keep it at or above `upload_max_filesize`. |

If a request is bigger than `post_max_size`, the application shows an **Upload too large** page: "The upload was too large for the server, so nothing was saved. Use smaller pictures and try again." Raise both values or upload smaller files. Expense receipts that exceed the limit show a message asking for a smaller photo or PDF.

## Time and memory

| Setting | Why it matters |
|---------|----------------|
| `max_execution_time` | The Migrations installer step and backups can take a while. |
| `memory_limit` | Raise it if large reports or exports run out of memory. |

## Required functions

Keep `symlink` and `proc_open` enabled (not in `disable_functions`) and leave `open_basedir` unset. The installer checks them. See [Server requirements](server-requirements.md).

## Related

- [Server requirements](server-requirements.md)
- [FAQs](../faqs.md)
