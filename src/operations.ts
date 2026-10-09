// Generated from the approved HTTP operations. Run bun run generate; do not edit.
import type { operations } from "./schema.js";
import { Transport } from "./transport.js";
import type { ApiResponse, RequestOptions } from "./transport.js";
type JsonSuccess<R> = { [K in keyof R]: K extends number ? `${K}` extends `2${string}` ? R[K] extends { content: { "application/json": infer T } } ? T : never : never : never }[keyof R];
export interface OperationMap {
  listInboxes: { params: Record<string, never>; result: JsonSuccess<operations["listInboxes"]["responses"]> };
  createInbox: { params: { body: operations["createInbox"]["requestBody"]["content"]["application/json"] }; result: JsonSuccess<operations["createInbox"]["responses"]> };
  getInbox: { params: operations["getInbox"]["parameters"]["path"]; result: JsonSuccess<operations["getInbox"]["responses"]> };
  updateInbox: { params: operations["updateInbox"]["parameters"]["path"] & { body: operations["updateInbox"]["requestBody"]["content"]["application/json"] }; result: JsonSuccess<operations["updateInbox"]["responses"]> };
  deleteInbox: { params: operations["deleteInbox"]["parameters"]["path"]; result: JsonSuccess<operations["deleteInbox"]["responses"]> };
  getSendingPolicy: { params: operations["getSendingPolicy"]["parameters"]["path"]; result: JsonSuccess<operations["getSendingPolicy"]["responses"]> };
  getReceivingPolicy: { params: operations["getReceivingPolicy"]["parameters"]["path"]; result: JsonSuccess<operations["getReceivingPolicy"]["responses"]> };
  listMessages: { params: operations["listMessages"]["parameters"]["path"] & NonNullable<operations["listMessages"]["parameters"]["query"]>; result: JsonSuccess<operations["listMessages"]["responses"]> };
  countMessages: { params: operations["countMessages"]["parameters"]["path"] & NonNullable<operations["countMessages"]["parameters"]["query"]>; result: JsonSuccess<operations["countMessages"]["responses"]> };
  getMessage: { params: operations["getMessage"]["parameters"]["path"]; result: JsonSuccess<operations["getMessage"]["responses"]> };
  deleteMessage: { params: operations["deleteMessage"]["parameters"]["path"]; result: JsonSuccess<operations["deleteMessage"]["responses"]> };
  updateMessageLabels: { params: operations["updateMessageLabels"]["parameters"]["path"] & { body: operations["updateMessageLabels"]["requestBody"]["content"]["application/json"] }; result: JsonSuccess<operations["updateMessageLabels"]["responses"]> };
  downloadRawMessage: { params: operations["downloadRawMessage"]["parameters"]["path"]; result: Response };
  downloadAttachment: { params: operations["downloadAttachment"]["parameters"]["path"]; result: Response };
  deleteSentMessage: { params: operations["deleteSentMessage"]["parameters"]["path"]; result: JsonSuccess<operations["deleteSentMessage"]["responses"]> };
  updateSentMessageLabels: { params: operations["updateSentMessageLabels"]["parameters"]["path"] & { body: operations["updateSentMessageLabels"]["requestBody"]["content"]["application/json"] }; result: JsonSuccess<operations["updateSentMessageLabels"]["responses"]> };
  getSentMessage: { params: operations["getSentMessage"]["parameters"]["path"]; result: JsonSuccess<operations["getSentMessage"]["responses"]> };
  bulkUpdateMessageLabels: { params: { body: operations["bulkUpdateMessageLabels"]["requestBody"]["content"]["application/json"] }; result: JsonSuccess<operations["bulkUpdateMessageLabels"]["responses"]> };
  bulkUpdateSentLabels: { params: { body: operations["bulkUpdateSentLabels"]["requestBody"]["content"]["application/json"] }; result: JsonSuccess<operations["bulkUpdateSentLabels"]["responses"]> };
  listLabels: { params: operations["listLabels"]["parameters"]["path"] & NonNullable<operations["listLabels"]["parameters"]["query"]>; result: JsonSuccess<operations["listLabels"]["responses"]> };
  sendMessage: { params: operations["sendMessage"]["parameters"]["path"] & { body: operations["sendMessage"]["requestBody"]["content"]["application/json"] }; result: JsonSuccess<operations["sendMessage"]["responses"]> };
  listSentMessages: { params: operations["listSentMessages"]["parameters"]["path"] & NonNullable<operations["listSentMessages"]["parameters"]["query"]>; result: JsonSuccess<operations["listSentMessages"]["responses"]> };
  replyMessage: { params: operations["replyMessage"]["parameters"]["path"] & { body: operations["replyMessage"]["requestBody"]["content"]["application/json"] }; result: JsonSuccess<operations["replyMessage"]["responses"]> };
  replyAllMessage: { params: operations["replyAllMessage"]["parameters"]["path"] & { body: operations["replyAllMessage"]["requestBody"]["content"]["application/json"] }; result: JsonSuccess<operations["replyAllMessage"]["responses"]> };
  forwardMessage: { params: operations["forwardMessage"]["parameters"]["path"] & { body: operations["forwardMessage"]["requestBody"]["content"]["application/json"] }; result: JsonSuccess<operations["forwardMessage"]["responses"]> };
  getOutboundQuota: { params: Record<string, never>; result: JsonSuccess<operations["getOutboundQuota"]["responses"]> };
  createDraft: { params: operations["createDraft"]["parameters"]["path"] & { body: operations["createDraft"]["requestBody"]["content"]["application/json"] }; result: JsonSuccess<operations["createDraft"]["responses"]> };
  listDrafts: { params: operations["listDrafts"]["parameters"]["path"] & NonNullable<operations["listDrafts"]["parameters"]["query"]>; result: JsonSuccess<operations["listDrafts"]["responses"]> };
  getDraft: { params: operations["getDraft"]["parameters"]["path"]; result: JsonSuccess<operations["getDraft"]["responses"]> };
  updateDraft: { params: operations["updateDraft"]["parameters"]["path"] & { body: operations["updateDraft"]["requestBody"]["content"]["application/json"] }; result: JsonSuccess<operations["updateDraft"]["responses"]> };
  deleteDraft: { params: operations["deleteDraft"]["parameters"]["path"]; result: JsonSuccess<operations["deleteDraft"]["responses"]> };
  sendDraft: { params: operations["sendDraft"]["parameters"]["path"] & { body: operations["sendDraft"]["requestBody"]["content"]["application/json"] }; result: JsonSuccess<operations["sendDraft"]["responses"]> };
  listThreads: { params: operations["listThreads"]["parameters"]["path"] & NonNullable<operations["listThreads"]["parameters"]["query"]>; result: JsonSuccess<operations["listThreads"]["responses"]> };
  getThread: { params: operations["getThread"]["parameters"]["path"] & NonNullable<operations["getThread"]["parameters"]["query"]>; result: JsonSuccess<operations["getThread"]["responses"]> };
  updateThreadLabels: { params: operations["updateThreadLabels"]["parameters"]["path"] & { body: operations["updateThreadLabels"]["requestBody"]["content"]["application/json"] }; result: JsonSuccess<operations["updateThreadLabels"]["responses"]> };
  deleteThread: { params: operations["deleteThread"]["parameters"]["path"]; result: JsonSuccess<operations["deleteThread"]["responses"]> };
  listTrash: { params: operations["listTrash"]["parameters"]["path"] & NonNullable<operations["listTrash"]["parameters"]["query"]>; result: JsonSuccess<operations["listTrash"]["responses"]> };
  restoreMessage: { params: operations["restoreMessage"]["parameters"]["path"]; result: JsonSuccess<operations["restoreMessage"]["responses"]> };
  restoreSentMessage: { params: operations["restoreSentMessage"]["parameters"]["path"]; result: JsonSuccess<operations["restoreSentMessage"]["responses"]> };
}
export type Operation = keyof OperationMap;
export type Params<O extends Operation> = OperationMap[O]["params"];
export type Result<O extends Operation> = OperationMap[O]["result"];
export const routes = {
  "listInboxes": {
    "path": "/v1/inboxes",
    "method": "GET",
    "pathParams": [],
    "queryParams": [],
    "body": false,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "createInbox": {
    "path": "/v1/inboxes",
    "method": "POST",
    "pathParams": [],
    "queryParams": [],
    "body": true,
    "binary": false,
    "successStatuses": [
      200,
      201
    ]
  },
  "getInbox": {
    "path": "/v1/inboxes/{inbox_id}",
    "method": "GET",
    "pathParams": [
      "inbox_id"
    ],
    "queryParams": [],
    "body": false,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "updateInbox": {
    "path": "/v1/inboxes/{inbox_id}",
    "method": "PATCH",
    "pathParams": [
      "inbox_id"
    ],
    "queryParams": [],
    "body": true,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "deleteInbox": {
    "path": "/v1/inboxes/{inbox_id}",
    "method": "DELETE",
    "pathParams": [
      "inbox_id"
    ],
    "queryParams": [],
    "body": false,
    "binary": false,
    "successStatuses": [
      202
    ]
  },
  "getSendingPolicy": {
    "path": "/v1/inboxes/{inbox_id}/sending-policy",
    "method": "GET",
    "pathParams": [
      "inbox_id"
    ],
    "queryParams": [],
    "body": false,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "getReceivingPolicy": {
    "path": "/v1/inboxes/{inbox_id}/receiving-policy",
    "method": "GET",
    "pathParams": [
      "inbox_id"
    ],
    "queryParams": [],
    "body": false,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "listMessages": {
    "path": "/v1/inboxes/{inbox_id}/messages",
    "method": "GET",
    "pathParams": [
      "inbox_id"
    ],
    "queryParams": [
      "limit",
      "cursor",
      "query",
      "from",
      "recipient",
      "subject",
      "after",
      "before",
      "labels_all",
      "labels_any",
      "labels_none",
      "order"
    ],
    "body": false,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "countMessages": {
    "path": "/v1/inboxes/{inbox_id}/messages/count",
    "method": "GET",
    "pathParams": [
      "inbox_id"
    ],
    "queryParams": [
      "query",
      "from",
      "recipient",
      "subject",
      "after",
      "before",
      "labels_all",
      "labels_any",
      "labels_none"
    ],
    "body": false,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "getMessage": {
    "path": "/v1/messages/{message_id}",
    "method": "GET",
    "pathParams": [
      "message_id"
    ],
    "queryParams": [],
    "body": false,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "deleteMessage": {
    "path": "/v1/messages/{message_id}",
    "method": "DELETE",
    "pathParams": [
      "message_id"
    ],
    "queryParams": [],
    "body": false,
    "binary": false,
    "successStatuses": [
      202
    ]
  },
  "updateMessageLabels": {
    "path": "/v1/messages/{message_id}",
    "method": "PATCH",
    "pathParams": [
      "message_id"
    ],
    "queryParams": [],
    "body": true,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "downloadRawMessage": {
    "path": "/v1/messages/{message_id}/raw",
    "method": "GET",
    "pathParams": [
      "message_id"
    ],
    "queryParams": [],
    "body": false,
    "binary": true,
    "successStatuses": [
      200
    ]
  },
  "downloadAttachment": {
    "path": "/v1/messages/{message_id}/attachments/{attachment_id}",
    "method": "GET",
    "pathParams": [
      "message_id",
      "attachment_id"
    ],
    "queryParams": [],
    "body": false,
    "binary": true,
    "successStatuses": [
      200
    ]
  },
  "deleteSentMessage": {
    "path": "/v1/sent/{message_id}",
    "method": "DELETE",
    "pathParams": [
      "message_id"
    ],
    "queryParams": [],
    "body": false,
    "binary": false,
    "successStatuses": [
      202
    ]
  },
  "updateSentMessageLabels": {
    "path": "/v1/sent/{message_id}",
    "method": "PATCH",
    "pathParams": [
      "message_id"
    ],
    "queryParams": [],
    "body": true,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "getSentMessage": {
    "path": "/v1/sent/{message_id}",
    "method": "GET",
    "pathParams": [
      "message_id"
    ],
    "queryParams": [],
    "body": false,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "bulkUpdateMessageLabels": {
    "path": "/v1/messages/labels",
    "method": "PATCH",
    "pathParams": [],
    "queryParams": [],
    "body": true,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "bulkUpdateSentLabels": {
    "path": "/v1/sent/labels",
    "method": "PATCH",
    "pathParams": [],
    "queryParams": [],
    "body": true,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "listLabels": {
    "path": "/v1/inboxes/{inbox_id}/labels",
    "method": "GET",
    "pathParams": [
      "inbox_id"
    ],
    "queryParams": [
      "limit",
      "cursor",
      "prefix"
    ],
    "body": false,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "sendMessage": {
    "path": "/v1/inboxes/{inbox_id}/sent",
    "method": "POST",
    "pathParams": [
      "inbox_id"
    ],
    "queryParams": [],
    "body": true,
    "binary": false,
    "successStatuses": [
      200,
      201
    ]
  },
  "listSentMessages": {
    "path": "/v1/inboxes/{inbox_id}/sent",
    "method": "GET",
    "pathParams": [
      "inbox_id"
    ],
    "queryParams": [
      "limit",
      "cursor",
      "query",
      "from",
      "recipient",
      "subject",
      "after",
      "before",
      "labels_all",
      "labels_any",
      "labels_none",
      "order"
    ],
    "body": false,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "replyMessage": {
    "path": "/v1/inboxes/{inbox_id}/reply",
    "method": "POST",
    "pathParams": [
      "inbox_id"
    ],
    "queryParams": [],
    "body": true,
    "binary": false,
    "successStatuses": [
      200,
      201
    ]
  },
  "replyAllMessage": {
    "path": "/v1/inboxes/{inbox_id}/reply-all",
    "method": "POST",
    "pathParams": [
      "inbox_id"
    ],
    "queryParams": [],
    "body": true,
    "binary": false,
    "successStatuses": [
      200,
      201
    ]
  },
  "forwardMessage": {
    "path": "/v1/inboxes/{inbox_id}/forward",
    "method": "POST",
    "pathParams": [
      "inbox_id"
    ],
    "queryParams": [],
    "body": true,
    "binary": false,
    "successStatuses": [
      200,
      201
    ]
  },
  "getOutboundQuota": {
    "path": "/v1/outbound/quota",
    "method": "GET",
    "pathParams": [],
    "queryParams": [],
    "body": false,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "createDraft": {
    "path": "/v1/inboxes/{inbox_id}/drafts",
    "method": "POST",
    "pathParams": [
      "inbox_id"
    ],
    "queryParams": [],
    "body": true,
    "binary": false,
    "successStatuses": [
      200,
      201
    ]
  },
  "listDrafts": {
    "path": "/v1/inboxes/{inbox_id}/drafts",
    "method": "GET",
    "pathParams": [
      "inbox_id"
    ],
    "queryParams": [
      "limit",
      "cursor",
      "state"
    ],
    "body": false,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "getDraft": {
    "path": "/v1/drafts/{draft_id}",
    "method": "GET",
    "pathParams": [
      "draft_id"
    ],
    "queryParams": [],
    "body": false,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "updateDraft": {
    "path": "/v1/drafts/{draft_id}",
    "method": "PATCH",
    "pathParams": [
      "draft_id"
    ],
    "queryParams": [],
    "body": true,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "deleteDraft": {
    "path": "/v1/drafts/{draft_id}",
    "method": "DELETE",
    "pathParams": [
      "draft_id"
    ],
    "queryParams": [],
    "body": false,
    "binary": false,
    "successStatuses": [
      202
    ]
  },
  "sendDraft": {
    "path": "/v1/drafts/{draft_id}/send",
    "method": "POST",
    "pathParams": [
      "draft_id"
    ],
    "queryParams": [],
    "body": true,
    "binary": false,
    "successStatuses": [
      200,
      201
    ]
  },
  "listThreads": {
    "path": "/v1/inboxes/{inbox_id}/threads",
    "method": "GET",
    "pathParams": [
      "inbox_id"
    ],
    "queryParams": [
      "limit",
      "cursor",
      "query",
      "from",
      "recipient",
      "subject",
      "after",
      "before",
      "labels_all",
      "labels_any",
      "labels_none",
      "order"
    ],
    "body": false,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "getThread": {
    "path": "/v1/threads/{thread_id}",
    "method": "GET",
    "pathParams": [
      "thread_id"
    ],
    "queryParams": [
      "limit",
      "cursor"
    ],
    "body": false,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "updateThreadLabels": {
    "path": "/v1/threads/{thread_id}",
    "method": "PATCH",
    "pathParams": [
      "thread_id"
    ],
    "queryParams": [],
    "body": true,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "deleteThread": {
    "path": "/v1/threads/{thread_id}",
    "method": "DELETE",
    "pathParams": [
      "thread_id"
    ],
    "queryParams": [],
    "body": false,
    "binary": false,
    "successStatuses": [
      202
    ]
  },
  "listTrash": {
    "path": "/v1/inboxes/{inbox_id}/trash",
    "method": "GET",
    "pathParams": [
      "inbox_id"
    ],
    "queryParams": [
      "limit",
      "cursor"
    ],
    "body": false,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "restoreMessage": {
    "path": "/v1/messages/{message_id}/restore",
    "method": "POST",
    "pathParams": [
      "message_id"
    ],
    "queryParams": [],
    "body": false,
    "binary": false,
    "successStatuses": [
      200
    ]
  },
  "restoreSentMessage": {
    "path": "/v1/sent/{message_id}/restore",
    "method": "POST",
    "pathParams": [
      "message_id"
    ],
    "queryParams": [],
    "body": false,
    "binary": false,
    "successStatuses": [
      200
    ]
  }
} as const;
export class Operations extends Transport {
  /** List inboxes. See the HTTP reference for state and recovery semantics. */
  listInboxes(options: RequestOptions = {}): Promise<ApiResponse<Result<"listInboxes">>> {
    return this.request(routes.listInboxes, {}, options);
  }

  /** Create an inbox. See the HTTP reference for state and recovery semantics. */
  createInbox(params: Params<"createInbox">, options: RequestOptions = {}): Promise<ApiResponse<Result<"createInbox">>> {
    return this.request(routes.createInbox, params, options);
  }

  /** Read an inbox. See the HTTP reference for state and recovery semantics. */
  getInbox(params: Params<"getInbox">, options: RequestOptions = {}): Promise<ApiResponse<Result<"getInbox">>> {
    return this.request(routes.getInbox, params, options);
  }

  /** Edit inbox names. See the HTTP reference for state and recovery semantics. */
  updateInbox(params: Params<"updateInbox">, options: RequestOptions = {}): Promise<ApiResponse<Result<"updateInbox">>> {
    return this.request(routes.updateInbox, params, options);
  }

  /** Delete an inbox. See the HTTP reference for state and recovery semantics. */
  deleteInbox(params: Params<"deleteInbox">, options: RequestOptions = {}): Promise<ApiResponse<Result<"deleteInbox">>> {
    return this.request(routes.deleteInbox, params, options);
  }

  /** Inspect sending rules. See the HTTP reference for state and recovery semantics. */
  getSendingPolicy(params: Params<"getSendingPolicy">, options: RequestOptions = {}): Promise<ApiResponse<Result<"getSendingPolicy">>> {
    return this.request(routes.getSendingPolicy, params, options);
  }

  /** Inspect receiving rules. See the HTTP reference for state and recovery semantics. */
  getReceivingPolicy(params: Params<"getReceivingPolicy">, options: RequestOptions = {}): Promise<ApiResponse<Result<"getReceivingPolicy">>> {
    return this.request(routes.getReceivingPolicy, params, options);
  }

  /** List received messages. See the HTTP reference for state and recovery semantics. */
  listMessages(params: Params<"listMessages">, options: RequestOptions = {}): Promise<ApiResponse<Result<"listMessages">>> {
    return this.request(routes.listMessages, params, options);
  }

  /** Count received messages. See the HTTP reference for state and recovery semantics. */
  countMessages(params: Params<"countMessages">, options: RequestOptions = {}): Promise<ApiResponse<Result<"countMessages">>> {
    return this.request(routes.countMessages, params, options);
  }

  /** Read a received message. See the HTTP reference for state and recovery semantics. */
  getMessage(params: Params<"getMessage">, options: RequestOptions = {}): Promise<ApiResponse<Result<"getMessage">>> {
    return this.request(routes.getMessage, params, options);
  }

  /** Delete a received message. See the HTTP reference for state and recovery semantics. */
  deleteMessage(params: Params<"deleteMessage">, options: RequestOptions = {}): Promise<ApiResponse<Result<"deleteMessage">>> {
    return this.request(routes.deleteMessage, params, options);
  }

  /** Label a received message. See the HTTP reference for state and recovery semantics. */
  updateMessageLabels(params: Params<"updateMessageLabels">, options: RequestOptions = {}): Promise<ApiResponse<Result<"updateMessageLabels">>> {
    return this.request(routes.updateMessageLabels, params, options);
  }

  /** Download raw MIME. See the HTTP reference for state and recovery semantics. */
  downloadRawMessage(params: Params<"downloadRawMessage">, options: RequestOptions = {}): Promise<ApiResponse<Result<"downloadRawMessage">>> {
    return this.request(routes.downloadRawMessage, params, options);
  }

  /** Download a received attachment. See the HTTP reference for state and recovery semantics. */
  downloadAttachment(params: Params<"downloadAttachment">, options: RequestOptions = {}): Promise<ApiResponse<Result<"downloadAttachment">>> {
    return this.request(routes.downloadAttachment, params, options);
  }

  /** Delete a sent copy. See the HTTP reference for state and recovery semantics. */
  deleteSentMessage(params: Params<"deleteSentMessage">, options: RequestOptions = {}): Promise<ApiResponse<Result<"deleteSentMessage">>> {
    return this.request(routes.deleteSentMessage, params, options);
  }

  /** Label a sent copy. See the HTTP reference for state and recovery semantics. */
  updateSentMessageLabels(params: Params<"updateSentMessageLabels">, options: RequestOptions = {}): Promise<ApiResponse<Result<"updateSentMessageLabels">>> {
    return this.request(routes.updateSentMessageLabels, params, options);
  }

  /** Read a sent message. See the HTTP reference for state and recovery semantics. */
  getSentMessage(params: Params<"getSentMessage">, options: RequestOptions = {}): Promise<ApiResponse<Result<"getSentMessage">>> {
    return this.request(routes.getSentMessage, params, options);
  }

  /** Label several received messages. See the HTTP reference for state and recovery semantics. */
  bulkUpdateMessageLabels(params: Params<"bulkUpdateMessageLabels">, options: RequestOptions = {}): Promise<ApiResponse<Result<"bulkUpdateMessageLabels">>> {
    return this.request(routes.bulkUpdateMessageLabels, params, options);
  }

  /** Label several sent copies. See the HTTP reference for state and recovery semantics. */
  bulkUpdateSentLabels(params: Params<"bulkUpdateSentLabels">, options: RequestOptions = {}): Promise<ApiResponse<Result<"bulkUpdateSentLabels">>> {
    return this.request(routes.bulkUpdateSentLabels, params, options);
  }

  /** Discover labels. See the HTTP reference for state and recovery semantics. */
  listLabels(params: Params<"listLabels">, options: RequestOptions = {}): Promise<ApiResponse<Result<"listLabels">>> {
    return this.request(routes.listLabels, params, options);
  }

  /** Send a message. See the HTTP reference for state and recovery semantics. */
  sendMessage(params: Params<"sendMessage">, options: RequestOptions = {}): Promise<ApiResponse<Result<"sendMessage">>> {
    return this.request(routes.sendMessage, params, options);
  }

  /** List sent messages. See the HTTP reference for state and recovery semantics. */
  listSentMessages(params: Params<"listSentMessages">, options: RequestOptions = {}): Promise<ApiResponse<Result<"listSentMessages">>> {
    return this.request(routes.listSentMessages, params, options);
  }

  /** Reply to a message. See the HTTP reference for state and recovery semantics. */
  replyMessage(params: Params<"replyMessage">, options: RequestOptions = {}): Promise<ApiResponse<Result<"replyMessage">>> {
    return this.request(routes.replyMessage, params, options);
  }

  /** Reply to all. See the HTTP reference for state and recovery semantics. */
  replyAllMessage(params: Params<"replyAllMessage">, options: RequestOptions = {}): Promise<ApiResponse<Result<"replyAllMessage">>> {
    return this.request(routes.replyAllMessage, params, options);
  }

  /** Forward a message. See the HTTP reference for state and recovery semantics. */
  forwardMessage(params: Params<"forwardMessage">, options: RequestOptions = {}): Promise<ApiResponse<Result<"forwardMessage">>> {
    return this.request(routes.forwardMessage, params, options);
  }

  /** Read sending allowance. See the HTTP reference for state and recovery semantics. */
  getOutboundQuota(options: RequestOptions = {}): Promise<ApiResponse<Result<"getOutboundQuota">>> {
    return this.request(routes.getOutboundQuota, {}, options);
  }

  /** Create a draft. See the HTTP reference for state and recovery semantics. */
  createDraft(params: Params<"createDraft">, options: RequestOptions = {}): Promise<ApiResponse<Result<"createDraft">>> {
    return this.request(routes.createDraft, params, options);
  }

  /** List drafts. See the HTTP reference for state and recovery semantics. */
  listDrafts(params: Params<"listDrafts">, options: RequestOptions = {}): Promise<ApiResponse<Result<"listDrafts">>> {
    return this.request(routes.listDrafts, params, options);
  }

  /** Retrieve a draft. See the HTTP reference for state and recovery semantics. */
  getDraft(params: Params<"getDraft">, options: RequestOptions = {}): Promise<ApiResponse<Result<"getDraft">>> {
    return this.request(routes.getDraft, params, options);
  }

  /** Edit a draft. See the HTTP reference for state and recovery semantics. */
  updateDraft(params: Params<"updateDraft">, options: RequestOptions = {}): Promise<ApiResponse<Result<"updateDraft">>> {
    return this.request(routes.updateDraft, params, options);
  }

  /** Delete a draft. See the HTTP reference for state and recovery semantics. */
  deleteDraft(params: Params<"deleteDraft">, options: RequestOptions = {}): Promise<ApiResponse<Result<"deleteDraft">>> {
    return this.request(routes.deleteDraft, params, options);
  }

  /** Send a draft. See the HTTP reference for state and recovery semantics. */
  sendDraft(params: Params<"sendDraft">, options: RequestOptions = {}): Promise<ApiResponse<Result<"sendDraft">>> {
    return this.request(routes.sendDraft, params, options);
  }

  /** List conversations. See the HTTP reference for state and recovery semantics. */
  listThreads(params: Params<"listThreads">, options: RequestOptions = {}): Promise<ApiResponse<Result<"listThreads">>> {
    return this.request(routes.listThreads, params, options);
  }

  /** Read a conversation. See the HTTP reference for state and recovery semantics. */
  getThread(params: Params<"getThread">, options: RequestOptions = {}): Promise<ApiResponse<Result<"getThread">>> {
    return this.request(routes.getThread, params, options);
  }

  /** Label a conversation. See the HTTP reference for state and recovery semantics. */
  updateThreadLabels(params: Params<"updateThreadLabels">, options: RequestOptions = {}): Promise<ApiResponse<Result<"updateThreadLabels">>> {
    return this.request(routes.updateThreadLabels, params, options);
  }

  /** Delete a conversation. See the HTTP reference for state and recovery semantics. */
  deleteThread(params: Params<"deleteThread">, options: RequestOptions = {}): Promise<ApiResponse<Result<"deleteThread">>> {
    return this.request(routes.deleteThread, params, options);
  }

  /** List Trash. See the HTTP reference for state and recovery semantics. */
  listTrash(params: Params<"listTrash">, options: RequestOptions = {}): Promise<ApiResponse<Result<"listTrash">>> {
    return this.request(routes.listTrash, params, options);
  }

  /** Restore a received message. See the HTTP reference for state and recovery semantics. */
  restoreMessage(params: Params<"restoreMessage">, options: RequestOptions = {}): Promise<ApiResponse<Result<"restoreMessage">>> {
    return this.request(routes.restoreMessage, params, options);
  }

  /** Restore a sent copy. See the HTTP reference for state and recovery semantics. */
  restoreSentMessage(params: Params<"restoreSentMessage">, options: RequestOptions = {}): Promise<ApiResponse<Result<"restoreSentMessage">>> {
    return this.request(routes.restoreSentMessage, params, options);
  }
}
