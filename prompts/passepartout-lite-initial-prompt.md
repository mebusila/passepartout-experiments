# Passepartout Lite — Build a Complete AI Desktop Assistant

Build Passepartout Lite from scratch in this empty repository. Do not inspect, reuse, or modify files outside this repository.

## Objective

Create a functional, polished, lightweight personal AI assistant called **Passepartout Lite**.

Passepartout Lite is a desktop application with an independently running backend server. It provides persistent conversations with LLMs, streaming responses, configurable providers, a simple long-term memory system, and an editable assistant personality.

The goal is a usable application, not a demonstration, mockup, or collection of scaffolding.

Implement the complete application, including backend, frontend, persistence, provider integrations, documentation, and tests.

Make reasonable technical decisions independently.

## 1. Architecture

Use the following stack.

### Backend

- Rust
- Tokio
- Axum
- SQLite
- Versioned REST API
- Server-Sent Events (SSE) for streaming

The server must be a standalone executable.

It must run independently of the desktop application and remain operational when all desktop windows are closed.

Bind to localhost by default.

The server is responsible for inference requests, conversation persistence, memory, configuration, generation state, and provider credentials.

### Desktop

- Tauri 2
- React
- TypeScript
- HTML/CSS

The desktop is a thin client that communicates with the backend through REST and SSE.

Keep the server and desktop clearly separated.

The design should allow additional client applications to be developed later without rewriting backend functionality.

Do not implement mobile clients now.

## 2. Desktop application behavior

Passepartout Lite is a tray-first application.

There is no main dashboard or manager window.

The native system tray menu should provide:

- New Chat
- History
- Settings
- Quit

### Chat windows

Each conversation opens in its own native desktop window.

The user must be able to:

- Create a conversation.
- Send messages.
- Receive streaming responses.
- Scroll through conversation history.
- Rename a conversation.
- Select an LLM provider and model.
- Change models during an existing conversation.
- Stop an active generation.
- Retry a failed or interrupted response.
- Copy assistant responses.
- View Markdown and formatted code blocks.

Multiple conversations may be open simultaneously in separate windows.

Closing a chat window must not terminate the application or the backend server.

### History

Provide a History window showing previous conversations.

The user should be able to search or browse conversations, reopen them, rename them, and delete them.

Conversation history must survive application restarts.

### Settings

Provide an independent Settings window with sections for:

- Providers and models
- Assistant personality
- Memory
- Appearance
- Server connection

Settings must persist appropriately.

## 3. LLM providers

Support three provider types.

### Ollama

Connect to a local Ollama instance.

Support:

- Configurable endpoint.
- Available models.
- Streaming responses.
- Model selection.
- Meaningful connection and error states.

### OpenRouter

Support OpenRouter's API.

Allow users to configure the provider and select an OpenRouter model.

Stream responses as they arrive rather than waiting for the complete answer.

### OpenAI-compatible providers

Support arbitrary OpenAI-compatible endpoints.

Allow configuration of:

- Base URL.
- API credentials, where required.
- Model identifier.

Handle provider-specific errors gracefully.

### Provider architecture

Keep provider implementations modular.

The chat system should use a common interface so additional providers can be implemented without rewriting conversation logic.

Provider credentials must be handled securely and never exposed unnecessarily to the desktop application or returned in ordinary API responses.

Support environment-based credential configuration and use secure operating-system facilities where appropriate.

## 4. Conversation persistence

Use SQLite to persist:

- Conversations.
- Messages.
- Message roles.
- Selected providers and models.
- Generation status.
- Timestamps.
- Application settings.
- Personality configuration.
- Long-term memories.

Use migrations rather than requiring a fresh database after changes.

Ensure database access works correctly with concurrent asynchronous server operations.

## 5. Streaming and generation lifecycle

This is an important architectural requirement.

Inference runs on the server, not in a desktop window.

A generation must continue even if the user closes the corresponding chat window or temporarily disconnects.

Implement:

- Incremental token streaming through SSE.
- Generation identifiers.
- Running, completed, failed, cancelled and interrupted states.
- Cancellation through an explicit server API.
- Error handling.
- Retry functionality.
- Client reconnection.
- Conversation state recovery after reconnecting.
- Restart handling for unfinished generations.

When the desktop reconnects, it must recover the current conversation state without duplicating messages.

Persist completed responses.

Keep the generation lifecycle separate from the network connection used to display its output.

Avoid starting multiple conflicting generations within the same conversation.

## 6. Assistant personality

Passepartout should feel like a useful personal assistant rather than a generic chatbot.

Its default personality should be:

- Warm and conversational.
- Intelligent and curious.
- Practical and helpful.
- Occasionally playful.
- Honest about uncertainty.
- Comfortable with technical conversations.
- Concise when appropriate, detailed when necessary.

Avoid robotic or excessively formal responses.

Allow the user to edit the assistant's personality and instructions in Settings.

Persist those instructions and include them in the context sent to the selected model.

## 7. Simple long-term memory

Implement a basic persistent memory system.

The assistant should be able to remember explicit information supplied by the user.

For example:

"Remember that I prefer Emacs."

The system should recognize explicit memory requests and persist useful information.

Provide:

- Memory creation.
- Memory retrieval.
- Memory search.
- Memory editing.
- Memory deletion.
- Persistent storage across conversations.
- Relevant memory inclusion in model context.

SQLite is sufficient. FTS5 can be used for memory searching.

Do not introduce GraphRAG, a graph database, or a complex autonomous memory architecture.

Keep the system understandable and maintainable.

## 8. User interface and visual design

Create a professional, elegant desktop interface.

The application should look like a real product, not a default developer tool or raw HTML prototype.

Requirements:

- Clean visual hierarchy.
- Attractive typography.
- Consistent spacing.
- Thoughtful use of colors.
- Light and dark themes.
- System appearance preference.
- Responsive layouts.
- Comfortable conversation reading.
- Attractive message composer.
- Clear streaming and generation status.
- Useful empty states.
- Polished Settings and History windows.
- Proper error messages and feedback.

Use modern CSS styling.

The application should feel calm, personal, and approachable.

Do not sacrifice usability for visual decoration.

The chat composer should remain usable while responses stream.

Ensure long conversations scroll naturally and code blocks display correctly.

## 9. API design

Expose a versioned REST API under `/api/v1`.

Include appropriate endpoints for:

- Health and connectivity.
- Conversations.
- Messages.
- Starting generation.
- Streaming generation events.
- Stopping generation.
- Retrying generation.
- Provider configuration.
- Models.
- Personality.
- Memory.
- Application settings.

Use clear request and response structures.

Document the API sufficiently for another developer to build a client.

Keep credentials server-side.

Use appropriate local API security, validation, and error handling.

## 10. Implementation scope

This is intentionally a simplified version of a larger personal-assistant concept.

Do not implement:

- Multiple autonomous agents.
- Agent orchestration.
- MCP integrations.
- External tools or shell execution.
- Google or email integrations.
- GraphRAG.
- Complex vector databases.
- Mobile applications.
- Remote deployment infrastructure.
- User-account management.
- Unrelated features.

Focus on completing the core assistant properly.

## 11. Tests and verification

Implement meaningful tests for important backend functionality.

At minimum, cover:

- Database creation and migrations.
- Conversation persistence.
- Message persistence.
- Settings persistence.
- Memory operations.
- Provider request handling.
- Generation state transitions.
- Streaming functionality.
- Cancellation and error handling.

Use mocked providers when external services or credentials are unavailable.

Add frontend tests where useful.

Verify the Rust workspace and frontend build.

Where dependencies and environment permit, verify the Tauri application builds.

Do not claim functionality was tested if only compilation was performed.

## 12. Documentation

Provide:

### README.md

Include:

- Project overview.
- Prerequisites.
- Installation.
- Server startup.
- Desktop startup.
- Ollama configuration.
- OpenRouter configuration.
- OpenAI-compatible provider configuration.
- Environment variables.
- Development commands.
- Testing commands.

### ARCHITECTURE.md

Explain:

- Overall architecture.
- Rust server.
- Tauri client.
- Database.
- Provider abstraction.
- Streaming lifecycle.
- Memory handling.
- Server/client communication.

### IMPLEMENTATION.md

Summarize:

- Implemented functionality.
- Important technical decisions.
- Verification performed.
- Known limitations.
- Remaining incomplete items.

## 13. Working instructions

You are responsible for implementing this project end to end.

Begin by inspecting the current repository, then establish the Rust workspace and desktop application.

Work incrementally, but continue implementing all required components.

Do not stop after creating a plan, documentation, or backend skeleton.

Do not stop after implementing only the server.

Do not stop after generating a UI that is not connected to real application state.

Build the actual application.

Use Git to track meaningful implementation milestones.

Run formatting, compilation, and tests throughout development.

If a command fails, investigate and correct the underlying problem.

Do not hide failures or claim unverified functionality works.

Make reasonable decisions without repeatedly requesting approval.

If an external API key, service, or graphical runtime is unavailable, use local mocks and continue implementing everything that can be verified independently.

Avoid unnecessary dependencies and overengineering.

## 14. Completion criteria

The task is complete when:

- The Rust server builds and starts.
- The SQLite database persists conversations and settings.
- The application supports real conversations through supported providers.
- Responses stream to the client.
- Generation can be cancelled.
- Closing a client window does not terminate server-side generation.
- Conversations can be reopened from History.
- The native system tray provides access to the application.
- Settings are functional.
- Provider and model selection work.
- Personality instructions can be edited.
- Explicit memories can be stored and retrieved.
- Light and dark themes work.
- The frontend is polished and functional.
- The server/client architecture is documented.
- Tests and build commands have been run.
- Known limitations are documented honestly.

At the end, provide a concise implementation report covering:

1. What was implemented.
2. Architectural decisions.
3. Repository structure.
4. Tests and build results.
5. What was actually verified.
6. Remaining limitations.
7. Git commit information.
8. Commands required to run the application.

**Build Passepartout Lite as a complete, independently runnable application.**

Begin implementation now.
