import * as Effect from "@effect/io/Effect";
import { Replier } from "./Replier";
import { Throwable } from "./ShardError";
import * as Schema from "@fp-ts/schema/Schema";

/**
 * An interface to communicate with a remote entity
 * @tparam Msg the type of message that can be sent to this entity type
 */
export interface Messenger<Msg> {
  /**
   * Send a message without waiting for a response (fire and forget)
   */
  sendDiscard(entityId: string): (msg: Msg) => Effect.Effect<never, Throwable, void>;

  /**
   * Send a message and wait for a response of type `Res`
   */
  send(
    entityId: string
  ): <Res>(
    replySchema: Schema.Schema<Res>,
    msg: (replier: Replier<Res>) => Msg
  ) => Effect.Effect<never, Throwable, Res>;
}
